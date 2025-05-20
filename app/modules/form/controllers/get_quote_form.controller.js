const getQuoteFormService = require("../services/get_quote_form.service");

exports.createForm = (req, res) => {
    // Call the service function that handles form creation logic
    getQuoteFormService.createForm(req, res);
};

exports.getForms = (req, res) => {
    // Call the service function that retrieves all quote forms
    getQuoteFormService.getForms(req, res);
};
