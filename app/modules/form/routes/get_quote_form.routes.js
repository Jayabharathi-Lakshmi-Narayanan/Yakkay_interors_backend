const getQuoteForm = require("../controllers/get_quote_form.controller");

module.exports = app => {
    var router = require("express").Router();

    // Middleware to set CORS headers for this router
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Routes
    router.post("/createquoteform", getQuoteForm.createForm);
    router.get("/getquoteforms", getQuoteForm.getForms);

    app.use('/api/quoteform', router);
};
