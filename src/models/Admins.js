const db = require("../database/db")
const Admin = db.sequelize.define("admins", {
   name: {
      type: db.sqlz.STRING,
   },
   email: {
      type: db.sqlz.STRING,
      unique: true,
   },
   password: {
      type: db.sqlz.STRING,
   },
})

//Admin.sync({ force: true })

module.exports = Admin
