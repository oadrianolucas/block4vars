const router = require("express").Router()
const filter = require("./middlewares/filter")
const adminController = require("./controllers/AdminsController")
const File = require("./models/Files")
const Audio = require("./models/Audio")
const Block4vars = require("./apis/block4vars")
const alert = require("./middlewares/alert")
const multer = require("multer")
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, __dirname + "/public/uploads")
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname)
   },
})
const upload = multer({ storage })
router.get("/create/admin", adminController.GetCreateAdmin)

router.post("/logout", filter, adminController.PostLogout)
router.post("/authenticate", adminController.PostAuthenticate)
router.post("/config/:ramo/:evento/:tela", filter, Block4vars.PostConfig)
router.get("/config/:ramo/:evento", filter, Block4vars.GetConfig)
router.get("/config/:ramo/:evento/:tela", filter, Block4vars.GetConfigScreen)
router.get(
   "/config/view/:ramo/:evento/:tela",
   filter,
   Block4vars.GetViewConfigScreen
)
router.get("/regulation/:id/:ramo/:evento", filter, Block4vars.GetSinister)
router.get(
   "/regulation/:id/:ramo/:evento/:tela",
   filter,
   Block4vars.GetSinisterScreen
)
router.get("/regulations", filter, Block4vars.GetSinisters)
router.get("/configurations", filter, Block4vars.GetAllConfigs)
router.get("/new/config", filter, Block4vars.GetNewConfig)
router.post("/new/config/screen", filter, Block4vars.PostNewScreen)
router.post("/add/screen", filter, Block4vars.PostConfig)
router.post("/edit/screen", filter, Block4vars.PutConfig)
router.post("/edit/sinister", filter, Block4vars.PutSinister)
router.post("/finish/config", filter, Block4vars.PostFinish)
router.get("/regulation/:id/:ramo/:evento/:tela/upload", filter, (req, res) => {
   var id = req.params.id
   var ramo = req.params.ramo
   var evento = req.params.evento
   var tela = req.params.tela
   File.findAll({ where: { tela: tela, idSini: id } }).then((file) => {
      res.render("upload", {
         id,
         ramo,
         evento,
         tela,
         file: file.map((file) => file.toJSON()),
      })
   })
})

router.get("/regulation/:id/:ramo/:evento/:tela/upload/audio", filter,(req, res) => {
   var id = req.params.id
   var ramo = req.params.ramo
   var evento = req.params.evento
   var tela = req.params.tela
   Audio.findAll({ where: { tela: tela, idSini: id } }).then((audio) => {
      res.render("audio", {
         id,
         ramo,
         evento,
         tela,
         audio: audio.map((audio) => audio.toJSON()),
      })
   })
})

router.post("/upload", upload.single("file"), filter, (req, res) => {
   var name = req.body.name
   var file = req.file.filename
   var tela = req.body.tela
   var id = req.body.id
   var ramo = req.body.ramo
   var evento = req.body.evento
   File.create({
      name: name,
      dest: file,
      tela: tela,
      idSini: id,
   })
      .then(() => {
         req.flash("success_msg", alert.FILE)
         res.redirect(`regulation/${id}/${ramo}/${evento}/${tela}/upload`)
      })
      .catch((erro) => {
         req.flash("error_msg", alert.FILE_ERROR)
         res.redirect(`regulation/${id}/${ramo}/${evento}/${tela}/upload`)
      })
})

router.get("/", (req, res) => {
   res.render("login")
})

router.post("/convert/audio", upload.single("file"), filter, async (req, res) => {
   var tela = req.body.tela
   var id = req.body.id
   var ramo = req.body.ramo
   var evento = req.body.evento
   const fs = require("fs")
   const speech = require("@google-cloud/speech")
   const file = req.file.path
   const filename = req.file.filename
   const client = new speech.SpeechClient()
   const config = {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: "pt-BR",
   }
   const audio = {
      content: fs.readFileSync(file).toString("base64"),
   }
   const request = {
      config: config,
      audio: audio,
   }
   try {
      const [response] = await client.recognize(request)
      const transcription = response.results
         .map((result) => result.alternatives[0].transcript)
         .join("\n")
      res.render("uploadaudio", {
         transcription,
         id,
         tela,
         ramo,
         evento,
         filename,
      })
   } catch (error) {
      console.log(error)
      req.flash("error_msg", alert.FILE_ERROR)
      res.redirect(`/regulation/${id}/${ramo}/${evento}/${tela}/upload/audio`)
   }
})

router.post("/uploadaudio", filter, (req, res) => {
   var name = req.body.name
   var dest = req.body.dest
   var tela = req.body.tela
   var id = req.body.id
   var ramo = req.body.ramo
   var evento = req.body.evento
   var textaudio = req.body.textaudio
   Audio.create({
      name: name,
      dest: dest,
      textaudio: textaudio,
      tela: tela,
      idSini: id,
   })
      .then(() => {
         req.flash("success_msg", alert.FILE)
         res.redirect(
            `/regulation/${id}/${ramo}/${evento}/${tela}/upload/audio`
         )
      })
      .catch((erro) => {
         req.flash("error_msg", alert.FILE_ERROR)
         res.redirect(
            `/regulation/${id}/${ramo}/${evento}/${tela}/upload/audio`
         )
      })
})

module.exports = router
