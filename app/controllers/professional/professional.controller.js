const professionalService = require("../../services/professional/professional.service");
nodemailer = require('nodemailer');
exports.allAccess = (req, res) => {
 res.status(200).send("Public Content.");
};
exports.professionalDetail = (req, res) => {
 res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
 res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
 res.status(200).send("Moderator Content.");
};
//Forgot password
exports.forgotpassword = (req, res) => {
  professionalService.forgotpassword(req,res);
}
//Reset password through forgot password 
exports.resetpassword = (req, res) => {
  console.log("Inside reset password");
  console.log(req);
  professionalService.resetpassword(req,res);
}
//Reset password after log-on using credentials 
exports.passwordreset = (req, res) => {
  professionalService.passwordreset(req,res);
}
exports.verifyToken = (req, res) => {
  res.status(200).send("token verified.");
  professionalService.conformpassword(req,res);
};
exports.signup = (req, res) => {
 // Validate request
  if (!req.body.email) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 } 
 professionalService.register(req,res);
};
exports.signin = (req, res) => {
 professionalService.login(req,res);
};

exports.createProfessionalinfo = (req, res) => {
  professionalService.createProfessionalinfo(req,res);
};
exports.updateProfessionalinfo = (req, res) => {
  professionalService.updateProfessionalinfo(req,res);
};
exports.createProfessionalinfoAdmin = (req, res) => {
  professionalService.createProfessionalinfoAdmin(req,res);
};
exports.updateProfessionalinfoAdmin = (req, res) => {
  professionalService.updateProfessionalinfoAdmin(req,res);
};
exports.updateProfessional = (req, res) => {
  professionalService.updateProfessional(req,res);
}; 
exports.updateProfessional = (req, res) => {
  professionalService.updateProfessional(req,res);
}; 


