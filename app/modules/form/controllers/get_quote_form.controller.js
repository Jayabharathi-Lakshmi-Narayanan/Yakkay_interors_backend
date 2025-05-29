const getQuoteFormService = require("../services/get_quote_form.service");

exports.createForm = (req, res) => {
    getQuoteFormService.createForm(req, res);
};

exports.getForms = (req, res) => {
    getQuoteFormService.getForms(req, res);
};
