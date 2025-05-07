const vendorService = require("../../services/vendor/vendor.service");
nodemailer = require('nodemailer');

exports.verifyToken = (req, res) => {
  res.status(200).send("token verified.");
  adminService.conformpassword(req,res);
};


exports.signup = (req, res) => {
 // Validate request
  if (!req.body.email) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 } 
 vendorService.vendorRegister(req,res);
};


exports.signin = (req, res) => {
  vendorService.login(req,res);
};

exports.forgotPassword = (req, res) => {
  vendorService.forgotPassword(req,res);
};

exports.resetPassword = (req, res) => {
  vendorService.resetPassword(req,res);
};