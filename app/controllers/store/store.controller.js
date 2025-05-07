const db = require("../../models");
nodemailer = require('nodemailer');
const storeService = require('../../services/store/store.service');

// 
exports.createStore = (req, res) => {
  storeService.createStore(req, res);
};

exports.createCategory = (req, res) => {
  storeService.createCategory(req, res);
};

exports.getAllCategories = (req, res) => {
  storeService.getAllCategories(req, res);
};

exports.getCategoryByName = (req, res) => {
  storeService.getCategoryByName(req, res);
};


// exports.getStoreByInfo = (req, res) => {
//   storeService.getStoreByInfo(req, res);
// };

exports.getStoreDetails = (req, res) => {
  storeService.getStoreDetails(req, res);
};