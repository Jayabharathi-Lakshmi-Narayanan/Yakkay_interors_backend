// const db = require("../../../models");
nodemailer = require('nodemailer');
const userService = require('../services/user.service');

// 
exports.register = (req, res) => {
    userService.register(req, res);
};

exports.login = (req, res) => {
    userService.login(req, res);
};

exports.forgotPassword = (req, res) => {
    userService.forgotPassword(req, res);
};

exports.resetPassword = (req, res) => {
    userService.resetPassword(req, res);
};

exports.getUserDetails = (req, res) => {
    userService.getUserDetails(req, res);
};

exports.updateUserDetails = (req, res) => {
    userService.updateUserDetails(req, res);
};


