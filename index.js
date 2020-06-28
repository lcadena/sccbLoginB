'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var socket = require('socket.io')
var port = 3800
var server = require('http').Server(app);
var socketio = require('socket.io');
const { request } = require('http');

// const serverIO = new Server(app);


//Conexión Database
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient: true})
mongoose.connect('mongodb://localhost:27017/scii', { useNewUrlParser:true, useUnifiedTopology: true })
	.then(() => {
		console.log("La conexión a la base de datos scii se ha realizado correctamente!!");

		 //Crear servidor
		 server = app.listen(port, () => {
		 	console.log("Api REST corriendo en http://localhost:3800");
		 });
		// SOCKETS
		//var server = require('http').Server(app);
			
		// const { Server } = require('https');
		const io = socketio.listen(server);
		const connectCounter = [];

		io.on('connection', (client) => {
			console.log('Un usuario se ha conectado con id de socket: ', client.id);
				// connectCounter.push(client.id)
				// console.log('active users en el server: ', connectCounter.length)
				// //const activeUsers = socket.client.conn.server.clientCount;
				// //client.emit('login', {activeUsers, user: socket.user})
				// // client.emit('login', {connectCounter})
			client.on('userRole', (user) => {
				console.log('usuario que llega: ', user)
			})

			client.on('disconnect', () => {
				console.log('user disconected')
			});
		});
	})
	.catch(err => console.log(err));



