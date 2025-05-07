const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { professionalinfo } = require("../models");
const db = require("../models");
const Professional = db.professional;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.professionalId = decoded.id;
    next();
  });
};
verifyTokenwithid = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.profId = decoded.id;
    if (decoded.id!=req.body.id) {
      return res.status(401).send({
        message: "User not matching with the credentials"
      });
    }
    next();
  });
};
const profverifyTokenwithaccessToken = async (req, res, next) => {
  const token = req.body.token;
  let accessToken = req.headers["x-access-token"];
  console.log(`Access token: ${accessToken}`);
  if (!token || !accessToken) {
    return res.status(403).send({
      message: "No token or accessToken provided!"
    });
  }
  
  try {
    const decodedAccessToken = jwt.verify(accessToken, config.secret);
    console.log(JSON.stringify(decodedAccessToken));
    
    if (decodedAccessToken.id !== token) {
      return res.status(401).send({
        message: "token does not match with the accessToken!"
      });
    }
    
    const professional = await Professional.findOne({ where: { token } });
    
    if (!professional) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    
    req.professional = professional;
    res.set('x-access-token', accessToken);    
    //userBookingCount(req, res, accessToken);
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized!"
    });
  }
};
const profverifyTokenwithaccessTokenSP = async (req, res, next) => {
  const token = req.body.i_professionalToken;
  let accessToken = req.headers["x-access-token"];
  console.log(`Access token: ${accessToken}`);
  if (!token || !accessToken) {
    return res.status(401).send({
      message: "Authentication failed. Please provide a valid token and accessToken."
    });
  }
  
  try {
    const decodedAccessToken = jwt.verify(accessToken, config.secret);
    console.log(JSON.stringify(decodedAccessToken));
    
    if (decodedAccessToken.id !== token) {
      return res.status(401).send({
        message: "Token does not match with the accessToken!"
      });
    }
    
    const professional = await Professional.findOne({ where: { token } });
    console.log(professional);
    
    if (!professional) {
      return res.status(401).send({
        message: "Authentication failed. Please provide a valid token and accessToken."
      });
    }
    
    req.body.i_professionalToken = professional.token; 
    res.set('x-access-token', accessToken);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({
      message: "Authentication failed. Please provide a valid token and accessToken."
    });
  }
};

isAdmin = (req, res, next) => {
  Professional.findByPk(req.profId).then(professional => {
    professional.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  Professional.findByPk(req.profId).then(professional => {
    professional.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
Professional.findByPk(req.Id).then(professional => {
    professional.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
const profauthJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  verifyTokenwithid: verifyTokenwithid,
  profverifyTokenwithaccessToken:profverifyTokenwithaccessToken,
  profverifyTokenwithaccessTokenSP:profverifyTokenwithaccessTokenSP
};
module.exports = profauthJwt;
