const Admin = require("../models/Admins")
const bcrypt = require("bcryptjs")
const alert = require("../middlewares/alert")

const AdminsController = {
   GetCreateAdmin(req, res) {
      var name = "Admin"
      var email = "admin@block4vars.com"
      var password = "admin123"
      var salt = bcrypt.genSaltSync(10)
      var hash = bcrypt.hashSync(password, salt)
      Admin.create({
         name: name,
         email: email,
         password: hash,
      })
         .then(() => {
            res.send("Admin criado com sucesso")
         })
         .catch((erro) => {
            res.send("Error ao realizar o Cadastrado" + erro)
         })
   },
   PostAuthenticate(req, res) {
      var email = req.body.email
      var password = req.body.password
      Admin.findOne({ where: { email: email } }).then((admin) => {
         if (admin != undefined) {
            var correct = bcrypt.compareSync(password, admin.password)
            if (correct) {
               req.session.admin = {
                  name: admin.name,
                  email: admin.email,
               }
               res.redirect("/regulations")
            } else {
               req.flash("error_msg", alert.INVALID_PASSWORD)
               res.redirect("/")
            }
         } else {
            req.flash("error_msg", alert.INVALID_LOGIN)
            res.redirect("/")
         }
      })
   },
   PostLogout(req, res) {
      req.session.email = undefined
      res.redirect("/")
   },
}
module.exports = AdminsController
