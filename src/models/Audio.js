const db = require("../database/db")
const Audio = db.sequelize.define("audios", {
   name: {
      type: db.sqlz.STRING,
   },
   dest: {
      type: db.sqlz.STRING,
   },
   textaudio: {
      type: db.sqlz.TEXT,
   },
   tela: {
      type: db.sqlz.STRING,
   },
   idSini: {
      type: db.sqlz.STRING,
   },
})

//Audio.sync({ force: true })

module.exports = Audio
