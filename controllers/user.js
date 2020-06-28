'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs'); //nos permite trabajar con archivos
var path = require('path'); //nos permite trabajar con rutas de archivos

var User = require ('../models/user'); //en mayuscula para indicar que es un modelo
var jwt = require('../services/jwt');
const rsa = require('rsa')
const bc = require('bigint-conversion')
const sha = require('object-sha')
const sss = require('shamirs-secret-sharing')

let keysLB;

// Métodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

//  Login
function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;
	User.findOne({email: req.body.email}, (err, user) => {
		console.log('user: ', user)
		if (err) return res.status(500).send({message: err})
		if (user.length === 0) return res.status(404).send('No existe el usuario')
		return res.status(200).send({
			message: 'Te has logueado correctamente',
			user: user,
			token: jwt.createToken(user)
		})
	})
}

function signUp(req, res) {
	var email = req.body.email
	const user = new User({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role
	});
	user.save((err, userSaved) => {
		console.log('saved---: ', userSaved)
		if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})
		return res.status(200).send({
			message: "Usuario registrado",
         	user: userSaved,
          	token: jwt.createToken(user)
		})
	})
}

async function getPublicKeyLB(req, res) {
	keysLB = rsa.rsaKeyGeneration()
	console.log('pubkey: ',keysLB['publicKey'])
    console.log('privkey: ',keysLB['privateKey'])
    return res.status(200).send(
        {e: bc.bigintToHex(keysLB['publicKey']['e']), 
         n: bc.bigintToHex(keysLB['publicKey']['n'])})
}

async function signId(req, res) {
	console.log('llega del cliente: ', req.body)
	console.log('llega del cliente2: ', req.body.message)
	let u = bc.hexToBigint(req.body.message)
	// firma del mensaje
	let s = keysLB['privateKey'].sign(u)
	console.log('Sign identity en el servidor', {
        sign: bc.bigintToHex(s)
	})
	return res.status(200).send({ message: bc.bigintToHex(s) })
}


module.exports = {
	home,
	loginUser,
	signUp,
	getPublicKeyLB,
	signId
}