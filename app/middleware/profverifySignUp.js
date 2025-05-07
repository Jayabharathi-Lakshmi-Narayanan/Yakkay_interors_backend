const db = require("../models");
const User = db.user;
const ROLES = db.rOLES;
const Professional = db.professional;
 duplicateUsernameOrEmail = (req, res, next) => {
//   // Username
// Professionalinfo.findOne({
//     where: {
//       email: req.body.email
//     }
//   }).then(professionalinfo => {
//     if (professionalinfo) {
//       res.status(400).send({
//         message: "Failed! Username is already in use!"
//       });
//       return;
//     }
    // Email
Professional.findOne({
      where: {
        email: req.body.email
      }
    }).then(professional => {
      if (professional) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  };

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};
const profverifySignUp = {
  duplicateUsernameOrEmail: duplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = profverifySignUp;