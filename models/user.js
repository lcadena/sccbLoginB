'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
		//_id lo pone de forma automatica
		name: String,
		surname: String,
		email: String,
		password: String,
		role: String,
});

module.exports = mongoose.model('User', UserSchema);