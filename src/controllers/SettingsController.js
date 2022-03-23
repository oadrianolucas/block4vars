const Setting = require("../models/Settings");
const Phase = require("../models/Phases");
const SettingsController = {
  // (/create/settings)
  PostCreateSettings(req, res) {
    var seguro = req.body.seguro;
    var evento = req.body.evento;
    Setting.create({
      seguro: seguro,
      evento: evento,
    })
      .then(() => {
        res.redirect("confirmation");
      })
      .catch((erro) => {
        res.send("Error ao iniciar configuração.");
      });
  },
  // (/create/confirmation)
  GetConfirmationId(req, res) {
    Setting.findAll({ order: [["id", "DESC"]], limit: 1 }).then((setting) => {
      res.render("confirmation", {
        setting: setting.map((setting) => setting.toJSON()),
      });
    });
  },
  // (/configuration)
  GetConfiguration(req, res) {
    Setting.findAll().then((setting) => {
      res.render("configuration", {
        setting: setting.map((setting) => setting.toJSON()),
      });
    });
  },
  // (/view/:id)
  GetViewSettingId(req, res) {
    var id = req.params.id;
    Setting.findByPk(id).then((setting) => {
      if (setting != undefined) {
        Phase.findAll({ where: { settingId: id } }).then((phases) => {
          res.render("view", {
            setting: setting.toJSON(),
            phases: phases.map((phases) => phases.toJSON()),
          });
        });
      } else {
        res.send("Error");
      }
    });
  },
  // (/delete/configuration)
  PostDeleteConfiguration(req, res) {
    var id = req.body.id;
    if (id != undefined) {
      if (!isNaN(id)) {
        Setting.destroy({
          where: {
            id: id,
          },
        }).then(() => {
          res.redirect("/configuration");
        });
      } else {
        res.redirect("/configuration");
      }
    } else {
      res.redirect("/configuration");
    }
  },
};
module.exports = SettingsController;
