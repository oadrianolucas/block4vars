const axios = require("axios");
const api = axios.create({
  baseURL: "http://34.125.97.36:5000",
});

const Block4vars = {
  async GetSinister(req, res) {
    var id = req.params.id;
    try {
      const { data } = await api.get("/sinistro?num_sinistro=" + id);
      return res.render("regulationview", { data, id });
    } catch (error) {
      res.send(error);
    }
  },
  GetTeste(req, res) {
    try {
      return res.render("viewscreen");
    } catch (error) {
      res.send(error);
    }
  },
  async GetSinisters(req, res) {
    try {
      const { data } = await api.get("/sinistro");
      return res.render("regulation", { data });
    } catch (error) {
      res.send(error);
    }
  },
  async GetAllConfigs(req, res) {
    try {
      const { data } = await api.get("/config");
      return res.render("configuration", { data });
    } catch (error) {
      res.send(error);
    }
  },
  async GetConfig(req, res) {
    var ramo = req.params.ramo;
    var evento = req.params.evento;
    const { data } = await api.get(`/config?ramo=${ramo}&evento=${evento}`);
    return res.render("view", { data, ramo, evento });
  },
  async GetConfigScreen(req, res) {
    var ramo = req.params.ramo;
    var evento = req.params.evento;
    var tela = req.params.tela;
    const { data } = await api.get(
      `/config?ramo=${ramo}&evento=${evento}&tela=${tela}`
    );
    return res.send({ data, ramo, evento });
  },
  GetNewConfig(req, res) {
    res.render("newconfig");
  },
  PostNewScreen(req, res) {
    var ramo = req.body.ramo;
    var evento = req.body.evento;
    try {
      return res.render("configscreen", { ramo, evento });
    } catch (error) {
      res.send(error);
    }
  },
  PostConfig(req, res) {
    var ramo = req.body.ramo;
    var evento = req.body.evento;
    var tela = req.body.tela;
    var dados = req.body.dados;
    try {
      api.post(
        "/config/v2?ramo=" + ramo + "&evento=" + evento + "&tela=" + tela,
        dados,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return res.render("confirmatioconfig", { ramo, evento });
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = Block4vars;
