const sqlz = require("sequelize");

const sequelize = new sqlz("block", "root", "block4vars", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  sqlz: sqlz,
  sequelize: sequelize,
};

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso ao banco de dados");
  })
  .catch(() => {
    console.log("Error ao se conectar com o banco de dados" + err);
  });
