const router = require("express").Router();
const filter = require("./middlewares/filter");
const adminControllers = require("./controllers/AdminsController");
const phaseControllers = require("./controllers/PhasesController");
const screenControllers = require("./controllers/ScreensController");
const settingsControllers = require("./controllers/SettingsController");

router.get("/create/admin", filter, adminControllers.GetCreateAdmin);

router.post("/logout", filter, adminControllers.PostLogout);

router.post("/authenticate", adminControllers.PostAuthenticate);

router.get("/phases/:id", filter, phaseControllers.GetPhasesId);

router.get("/phase/:id", filter, phaseControllers.GetPhaseId);

router.post("/create/phase", filter, phaseControllers.PostCreatePhase);

router.post("/create2/phase", filter, phaseControllers.PostCreate2Phase);

router.get("/regulation", filter, (req, res) => {
  res.render("regulation");
});

router.post("/create/screen", filter, screenControllers.PostCreateScreen);

router.get("/screen/:id", filter, screenControllers.GetScreenId);

router.post("/update/screen", filter, screenControllers.PostUpdateScreen);

router.get("/view/screens/:id", filter, screenControllers.GetFindAllScreensId);

router.get("/view/screen/:id", filter, screenControllers.GetViewScreenId);

router.post("/create/settings", filter, settingsControllers.PostCreateSettings);

router.get(
  "/create/confirmation",
  filter,
  settingsControllers.GetConfirmationId
);

router.get("/configuration", filter, settingsControllers.GetConfiguration);

router.get("/view/:id", filter, settingsControllers.GetViewSettingId);

router.post(
  "/delete/configuration",
  filter,
  settingsControllers.PostDeleteConfiguration
);

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/regulation/view/123", filter, (req, res) => {
  res.render("regulationview123");
});

router.get("/regulation/view/456", filter, (req, res) => {
  res.render("regulationview456");
});

router.get("/regulation/view/789", filter, (req, res) => {
  res.render("regulationview789");
});

module.exports = router;
