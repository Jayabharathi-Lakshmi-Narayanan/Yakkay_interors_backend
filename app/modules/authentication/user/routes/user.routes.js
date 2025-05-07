module.exports = app => {
  const user = require("../controllers/user.controller");
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
  router.post("/register", user.register);
  router.post("/login", user.login);
  router.post("/forgotPassword", user.forgotPassword);
  router.post("/resetPassword", user.resetPassword);
  router.post("/getUserDetails", user.getUserDetails);
  router.post("/updateUserDetails", user.updateUserDetails)


  app.use('/api/user', router);
};
