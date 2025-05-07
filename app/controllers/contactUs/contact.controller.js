const professionalService = require("../../services/professional/professional.service");
const contactService = require("../../services/ContactUs/contact.service");
nodemailer = require('nodemailer');

// contactus
exports.contactUs = (req, res) => {
    contactService.contactUs(req, res);
},
exports.findAllContact = (req, res) => {
    contactService.findAllContact(req, res);
}

