'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty'); //para poder subir la imagen
var md_upload = multipart({uploadDir: './uploads/users'}); //directorio de subidas, donde se van a guardar los ficheros que suba el multiparti

api.get('/home', UserController.home);
api.post('/login', UserController.loginUser);
api.post('/save', UserController.signUp);

// RSA endpoints
api.get('/getPubKey', UserController.getPublicKeyLB);
api.post('/sign', UserController.signId);


module.exports = api;