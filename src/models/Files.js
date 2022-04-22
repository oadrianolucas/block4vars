const db = require("../database/db")
const File = db.sequelize.define("files", {
   name: {
      type: db.sqlz.STRING,
   },
   dest: {
      type: db.sqlz.STRING,
   },
   tela: {
      type: db.sqlz.STRING,
   },
   idSini: {
      type: db.sqlz.STRING,
   },
})

//File.sync({ force: true })

module.exports = File
