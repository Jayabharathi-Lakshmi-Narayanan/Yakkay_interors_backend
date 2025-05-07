const db = require("../../models");
nodemailer = require('nodemailer');
const storeProductService = require('../../services/store/product.service');

// 
exports.createProduct = (req, res) => {
  storeProductService.createProduct(req, res);
};

exports.getAllProducts = (req, res) => {
  storeProductService.getAllProducts(req, res);
};

exports.getOneProduct = (req, res) => {
  storeProductService.getOneProduct(req, res);
};

exports.updateproduct = (req, res) => {
  storeProductService.updateproduct(req, res);
};