const Screen = require("../models/Screens");
const ScreensController = {
  // (/create/screen)
  PostCreateScreen(req, res) {
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
  },
  // (/screen/:id)
  GetScreenId(req, res) {
    var id = req.params.id;
    Screen.findByPk(id).then((screen) => {
      res.render("configscreen", { screen: screen.toJSON() });
    });
  },
  // (/update/screen)
  PostUpdateScreen(req, res) {
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
  },
  // (/view/screens/:id)
  GetFindAllScreensId(req, res) {
    var id = req.params.id;
    Screen.findAll({ where: { phaseId: id } }).then((screens) => {
      res.render("viewscreens", {
        screens: screens.map((screens) => screens.toJSON()),
      });
    });
  },
  // (/view/screen/:id)
  GetViewScreenId(req, res) {
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
  },
};
module.exports = ScreensController;
