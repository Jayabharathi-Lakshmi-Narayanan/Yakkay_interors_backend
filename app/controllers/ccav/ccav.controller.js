
const ccavRequestHandler = require("../../services/ccav/ccavRequestHandler");
const ccavResponseHandler = require("../../services/ccav/ccavResponseHandler");
nodemailer = require('nodemailer');

// contactus
exports.postReq = (req, res) => {
    ccavRequestHandler.postReq(req, res);
},
    exports.postRes = (req, res) => {
        const requestBody = req.body; // Access parsed request body
        ccavResponseHandler.postRes(requestBody, res);
    }

