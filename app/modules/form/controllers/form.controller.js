const nodemailer = require('nodemailer');
const formService = require('../services/form.service');

exports.createForm = (req, res) => {
    formService.createForm(req, res);
};

exports.getForm = (req, res) => {
    formService.getForm(req, res);
};
