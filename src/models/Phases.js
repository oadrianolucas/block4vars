const db = require("../database/db");
const Settings = require("../models/Settings");
const Phase = db.sequelize.define("phases", {
  name: {
    type: db.sqlz.STRING,
  },
});

Settings.hasMany(Phase);
Phase.belongsTo(Settings);

//Phase.sync({ force: true });

module.exports = Phase;
