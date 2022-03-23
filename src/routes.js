const router = require("express").Router();
const filter = require("./middlewares/filter");
const adminController = require("./controllers/AdminsController");
const phaseController = require("./controllers/PhasesController");
const screenController = require("./controllers/ScreensController");
const settingsController = require("./controllers/SettingsController");
const api = require("./apis/block4vars");

router.get("/create/admin", filter, adminController.GetCreateAdmin);

router.post("/logout", filter, adminController.PostLogout);

router.post("/authenticate", adminController.PostAuthenticate);

router.get("/phases/:id", filter, phaseController.GetPhasesId);

router.get("/phase/:id", filter, phaseController.GetPhaseId);

router.post("/create/phase", filter, phaseController.PostCreatePhase);

router.post("/create2/phase", filter, phaseController.PostCreate2Phase);

router.post("/create/screen", filter, screenController.PostCreateScreen);

router.get("/screen/:id", filter, screenController.GetScreenId);

router.post("/update/screen", filter, screenController.PostUpdateScreen);

router.get("/view/screens/:id", filter, screenController.GetFindAllScreensId);

router.get("/view/screen/:id", filter, screenController.GetViewScreenId);

router.post("/create/settings", filter, settingsController.PostCreateSettings);

router.get(
  "/create/confirmation",
  filter,
  settingsController.GetConfirmationId
);

router.get("/configuration", filter, settingsController.GetConfiguration);

router.get("/view/:id", filter, settingsController.GetViewSettingId);

router.post(
  "/delete/configuration",
  filter,
  settingsController.PostDeleteConfiguration
);

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/regulation", filter, async (req, res) => {
  try {
    const { data } = await api.get("/sinistro");
    return res.render("regulation", { data });
  } catch (error) {
    res.send(error);
  }
});

router.get("/regulation/view/:id", async (req, res) => {
  var id = req.params.id;
  try {
    const { data } = await api.get("/sinistro?num_sinistro=" + id);
    return res.render("regulationview", { data });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
