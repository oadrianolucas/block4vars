const db = require("../database/db");
const Setting = db.sequelize.define("settings", {
  seguro: {
    type: db.sqlz.STRING,
  },
  evento: {
    type: db.sqlz.STRING,
  },
});

//Setting.sync({ force: true });

module.exports = Setting;
