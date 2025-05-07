const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const adminAuthJwt = require("./adminAuthJwt");
const adminVerifySignUp = require("./adminVerifySignUp");
const profauthJwt = require("./profauthJwt");
const profverifySignUp = require("./profverifySignUp");
module.exports = {
  authJwt,
  verifySignUp,
  adminAuthJwt,
  adminVerifySignUp,
  profauthJwt,
  profverifySignUp, 
};