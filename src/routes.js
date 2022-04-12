const router = require("express").Router();
const filter = require("./middlewares/filter");
const adminController = require("./controllers/AdminsController");
const Block4vars = require("./apis/block4vars");

router.get("/create/admin", filter, adminController.GetCreateAdmin);

router.post("/logout", filter, adminController.PostLogout);

router.post("/authenticate", adminController.PostAuthenticate);

router.post("/config/:ramo/:evento/:tela", Block4vars.PostConfig);

router.get("/config/:ramo/:evento", Block4vars.GetConfig);

router.get("/config/:ramo/:evento/:tela", Block4vars.GetConfigScreen);

router.get("/regulation/:id", Block4vars.GetSinister);

router.get("/regulations", Block4vars.GetSinisters);

router.get("/configurations", Block4vars.GetAllConfigs);

router.get("/new/config", Block4vars.GetNewConfig);

router.post("/new/config/screen", Block4vars.PostNewScreen);

router.post("/add/screen", Block4vars.PostConfig);

router.get("/teste", Block4vars.GetTeste);

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;
