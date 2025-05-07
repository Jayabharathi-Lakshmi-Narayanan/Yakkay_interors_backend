const form = require("../controllers/form.controller");

module.exports = app => {
    // const { authJwt } = require("../../middleware/index.js");
    // const { verifySignUp } = require("../../middleware/index.js");
    // const passport = require('passport');
    var router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // User  
    router.post("/createform", form.createForm);

    router.get("/getform", form.getForm);

    app.use('/api/form', router);
};
