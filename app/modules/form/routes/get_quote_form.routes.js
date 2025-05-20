// console.log("✅ get_quote_form.routes.js loaded");

// const getQuoteForm = require("../controllers/get_quote_form.controller");
// const router = require("express").Router();

// // ✅ Set headers
// router.use((req, res, next) => {
//     res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
// });

// // ✅ Define your routes
// router.post("/createquoteform", getQuoteForm.createForm);
// router.get("/getquoteforms", getQuoteForm.getForms);

// // ✅ Export the function to mount these routes in server.js
// module.exports = (app) => {
//     console.log("✅ get_quote_form.routes.js loaded"); // Add this for confirmation
//     app.use("/api/quoteform", router); // Mounts at /api/get-quote-form/*
// };








const getQuoteForm = require("../controllers/get_quote_form.controller");

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
    router.post("/createquoteform", getQuoteForm.createForm);
    router.get("/getquoteforms", getQuoteForm.getForms);

    app.use('/api/quoteform', router);
};
