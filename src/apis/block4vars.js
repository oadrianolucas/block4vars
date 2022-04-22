const alert = require("../middlewares/alert")
const axios = require("axios")
const api = axios.create({
   baseURL: "http://34.125.97.36:5000",
})
const Block4vars = {
   async GetSinister(req, res) {
      var id = req.params.id
      try {
         var { data } = await api.get(`/sinistro?num_sinistro=${id}`)
         return res.render("regulationview", { data, id })
      } catch (error) {
         res.send(error)
      }
   },
   async GetSinisters(req, res) {
      try {
         var { data } = await api.get("/sinistro")
         return res.render("regulation", { data })
      } catch (error) {
         res.send(error)
      }
   },
   async GetAllConfigs(req, res) {
      try {
         var { data } = await api.get("/config")
         return res.render("configuration", { data })
      } catch (error) {
         res.send(error)
      }
   },
   async GetConfig(req, res) {
      var ramo = req.params.ramo
      var evento = req.params.evento
      var { data } = await api.get(`/config?ramo=${ramo}&evento=${evento}`)
      return res.render("viewallscrenconfig", { data, ramo, evento })
   },
   async GetConfigScreen(req, res) {
      var ramo = req.params.ramo
      var evento = req.params.evento
      var tela = req.params.tela
      var { data } = await api.get(
         `/config?ramo=${ramo}&evento=${evento}&tela=${tela}`
      )
      var jsonData = JSON.stringify(data)
      return res.render("configeditscreen", { jsonData, ramo, evento, tela })
   },
   async GetViewConfigScreen(req, res) {
      var ramo = req.params.ramo
      var evento = req.params.evento
      var tela = req.params.tela
      var { data } = await api.get(
         `/config?ramo=${ramo}&evento=${evento}&tela=${tela}`
      )
      var jsonData = JSON.stringify(data)
      return res.render("viewscreen", { jsonData, ramo, evento, tela })
   },
   async GetSinisterScreen(req, res) {
      var id = req.params.id
      var tela = req.params.tela
      var ramo = req.params.ramo
      var evento = req.params.evento
      var { data } = await api.get(`/sinistro?num_sinistro=${id}&tela=${tela}`)
      var jsonData = JSON.stringify(data)
      return res.render("editsinister", { jsonData, id, tela, ramo, evento })
   },
   PostNewScreen(req, res) {
      var ramo = req.body.ramo
      var evento = req.body.evento
      try {
         return res.render("configscreen", { ramo, evento })
      } catch (error) {
         res.send(error)
      }
   },
   PostConfig(req, res) {
      var ramo = req.body.ramo
      var evento = req.body.evento
      var tela = req.body.tela
      var dados = req.body.dados
      try {
         api.post(`/config?ramo=${ramo}&evento=${evento}&tela=${tela}`, dados, {
            headers: {
               "content-type": "application/json",
            },
         })
         return res.render("confirmatioconfig", { ramo, evento })
      } catch (error) {
         res.send(error)
      }
   },
   PutConfig(req, res) {
      var ramo = req.body.ramo
      var evento = req.body.evento
      var tela = req.body.tela
      var dados = req.body.dados
      try {
         api.post(`/config?ramo=${ramo}&evento=${evento}&tela=${tela}`, dados, {
            headers: {
               "content-type": "application/json",
            },
         })
         return (
            req.flash("success_msg", alert.PUT_CONFIG),
            res.redirect(`/config/${ramo}/${evento}`)
         )
      } catch (error) {
         req.flash("error_msg", alert.ERROR_PUT_CONFIG)
         res.redirect(`/config/${ramo}/${evento}`)
      }
   },
   PutSinister(req, res) {
      var id = req.body.id
      var ramo = req.body.ramo
      var evento = req.body.evento
      var dados = JSON.parse(req.body.dados)
      api.post(`/sinistro?num_sinistro=${id}`, {
         evento: evento,
         ramo: ramo,
         dados: dados,
      })
         .then((data) => {
            req.flash("success_msg", alert.PUT_SINISTER)
            res.redirect(`/regulation/${id}/${evento}/${ramo}`)
         })
         .catch((error) => {
            req.flash("error_msg", alert.ERROR_PUT_SINISTER)
            res.redirect(`/regulation/${id}/${evento}/${ramo}`)
         })
   },
   async GetTextAudio(req, res) {
      var { data } = await api.get(`/uploader`)
      return res.sand({ data })
   },
   GetNewConfig(req, res) {
      res.render("newconfig")
   },
   PostFinish(req, res) {
      req.flash("success_msg", alert.POST_CONFIG)
      res.redirect("/configurations")
   },
}

module.exports = Block4vars
