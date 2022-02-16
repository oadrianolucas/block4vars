const express = require("express");
const router = express.Router();
const Setting = require("../models/Settings");
const Phase = require("../models/Phases");
const Screen = require("../models/Screens");
const Admin = require("../models/Admins");
const bcrypt = require("bcryptjs");
const filter = require("../middlewares/filter");

router.post("/create/settings", filter, (req, res) => {
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
});

router.get("/create/confirmation", filter, (req, res) => {
  Setting.findAll({ order: [["id", "DESC"]], limit: 1 }).then((setting) => {
    res.render("confirmation", {
      setting: setting.map((setting) => setting.toJSON()),
    });
  });
});

router.get("/create/confirmation", filter, (req, res) => {
  Setting.findAll({ order: [["id", "DESC"]], limit: 1 }).then((setting) => {
    res.render("confirmation", {
      setting: setting.map((setting) => setting.toJSON()),
    });
  });
});

router.get("/phases/:id", filter, (req, res) => {
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
});

router.get("/phase/:id", filter, (req, res) => {
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
});

router.post("/create/phase", filter, (req, res) => {
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
});

router.post("/create2/phase", filter, (req, res) => {
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
});

router.post("/create/screen", filter, (req, res) => {
  var name = req.body.name;
  var phase = req.body.phase;
  Screen.create({
    name: name,
    phaseId: phase,
  })
    .then(() => {
      res.redirect("/phase/" + phase);
    })
    .catch((erro) => {
      res.send("Error ao iniciar configuração.");
    });
});

router.get("/screen/:id", filter, (req, res) => {
  var id = req.params.id;
  Screen.findByPk(id).then((screen) => {
    res.render("configscreen", { screen: screen.toJSON() });
  });
});

router.post("/update/screen", filter, (req, res) => {
  var id = req.body.id;
  var json = req.body.json;
  var phase = req.body.phase;
  Screen.update(
    {
      id: id,
      json: json,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      res.redirect("/phase/" + phase);
    })
    .catch((erro) => {
      res.send("<h2>Erro ao configurar tela.</h2>" + erro);
    });
});

router.get("/configuration", filter, (req, res) => {
  Setting.findAll().then((setting) => {
    res.render("configuration", {
      setting: setting.map((setting) => setting.toJSON()),
    });
  });
});

router.get("/regulation", filter, (req, res) => {
  res.render("regulation");
});

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

router.get("/view/:id", filter, (req, res) => {
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
});

router.get("/view/screens/:id", filter, (req, res) => {
  var id = req.params.id;
  Screen.findAll({ where: { phaseId: id } }).then((screens) => {
    res.render("viewscreens", {
      screens: screens.map((screens) => screens.toJSON()),
    });
  });
});

router.get("/view/screen/:id", filter, (req, res) => {
  var id = req.params.id;
  Screen.findByPk(id).then((screen) => {
    if (screen != undefined) {
      res.render("viewscreen", {
        screen: screen.toJSON(),
      });
    } else {
      res.send("Erro ao buscar ");
    }
  });
});

router.post("/authenticate", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  Admin.findOne({ where: { email: email } }).then((admin) => {
    if (admin != undefined) {
      var correct = bcrypt.compareSync(password, admin.password);
      if (correct) {
        req.session.admin = {
          name: admin.name,
          email: admin.email,
        };
        res.redirect("/configuration");
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  });
});

router.get("/create/admin", (req, res) => {
  var name = "Admin";
  var email = "admin@block4vars.com";
  var password = "admin123";
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  Admin.create({
    name: name,
    email: email,
    password: hash,
  })
    .then(() => {
      res.send("Admin criado com sucesso");
    })
    .catch((erro) => {
      res.send("Error ao realizar o Cadastrado" + erro);
    });
});

router.post("/logout", (req, res) => {
  req.session.email = undefined;
  res.redirect("/");
});

router.post("/delete/configuration", filter, (req, res) => {
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
});

module.exports = router;
