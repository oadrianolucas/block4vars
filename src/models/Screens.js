const db = require("../database/db");
const Phases = require("../models/Phases");
const Screen = db.sequelize.define("screens", {
  name: {
    type: db.sqlz.STRING,
  },
  json: {
    type: db.sqlz.TEXT,
  },
});

Phases.hasMany(Screen);
Screen.belongsTo(Phases);

//Screen.sync({ force: true });

module.exports = Screen;
