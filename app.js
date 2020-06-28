'use strict'
const cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
// const socketIO = require('socket.io')
// const http = require('http')
// const session = require('express-session')
// const server = http.createServer(app)
// const io = socketIO(server)

// cargar rutas
var user_routes = require('./routes/user');
const user = require('./models/user');

// middlewares  metodo que se ejecuta antes de que llegue a un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json())

//cors
// app.use(cors({origin: 'http://localhost:4200'}, {origin: 'http://localhost:3000'}))
// app.options('*',cors())

app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin","http://localhost:8100", "https://www.facebook.com");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000", "http://localhost:4200", "http://localhost:3800");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    }
    next()
})
app.use(cors())

//rutas
app.use('', user_routes);

// // SOCKETS
// var server = require('http').Server(app);
// var socketio = require('socket.io');
// // const { Server } = require('https');
// const io = socketio.listen(server);

// io.on('connection', (client) => {
// 	console.log('Un usuario se ha conectado con id de socket: ', client);
//     client.on('disconnect', () => {
// 		console.log('user disconected')
// 	});
// });

//exportar	
module.exports = app; 

// server.listen(3100, () => console.log(`App running on port 3100`))
// io.on('connection', socket => {
//     console.log('User connected');

//     socket.on('login', user => {
//         socket.user = {id: socket.client.id};
//         const activeUsers = socket.client.conn.server.clientCount;
//         socket.emit('login', {activeUsers, user: socket.user})
//     });

// });