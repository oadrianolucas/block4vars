const Setting = require("../models/Settings");
const Phase = require("../models/Phases");
const Screen = require("../models/Screens");
const PhasesController = {
  // (/phases/:id)
  GetPhasesId(req, res) {
    var id = req.params.id;
    Setting.findByPk(id).then((setting) => {
      if (setting != undefined) {
        Phase.findAll({
          where: { settingId: id },
        }).then((phases) => {
          res.render("phases", {
            setting: setting.toJSON(),
            phases: phases.map((phases) => phases.toJSON()),
          });
        });
      } else {
        res.send("Error ao encontrar Confirguração");
      }
    });
  },
  // (/phase/:id)
  GetPhaseId(req, res) {
    var id = req.params.id;
    Phase.findByPk(id).then((phase) => {
      if (phase != undefined) {
        Screen.findAll({
          where: { phaseId: id },
        }).then((screens) => {
          res.render("screen", {
            phase: phase.toJSON(),
            screens: screens.map((screens) => screens.toJSON()),
          });
        });
      } else {
        res.send("Error ao encontrar Confirguração");
      }
    });
  },
  // (/create/phase)
  PostCreatePhase(req, res) {
    var name = req.body.name;
    var setting = req.body.setting;
    Phase.create({
      name: name,
      settingId: setting,
    })
      .then(() => {
        res.redirect("/phases/" + setting);
      })
      .catch((erro) => {
        res.send("Error ao criar etapa.");
      });
  },
  // (/create2/phase)
  PostCreate2Phase(req, res) {
    var name = req.body.name;
    var setting = req.body.setting;
    Phase.create({
      name: name,
      settingId: setting,
    })
      .then(() => {
        res.redirect("/phase/" + setting);
      })
      .catch((erro) => {
        res.send("Error ao criar etapa.");
      });
  },
};
module.exports = PhasesController;
