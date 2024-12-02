const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this
const connectToDB = require('./db');
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');

app.use(cors()); // Add cors middleware

const server = http.createServer(app); // Add this
connectToDB();

// Add this
// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Add this
// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add this
  // Add a user to a room
  socket.on('join_room', async (data) => {
	console.log('data', data);
    const { username, roomId } = data; // Data sent from client when join_room event emitted
	//todo store username and room to mongodb
	const dataUser = await userController.saveUser({ username: data.username })
	if(dataUser) {
		console.log('success join room');
		const dataMessages = await messageController.getMessages(data)
		console.log('dataMessages', dataMessages)
		socket.emit('join_room_success', dataMessages)
		socket.join(roomId); // Join the user to a socket room
	} else {
		console.log('username exist');
		socket.emit('join_room_failed', 'Username exist')
	}
	//if username exist, emit join_room_failed
	// else fetch message from mongodb , emit join_room_success with message data
  });
socket.on('rejoin_room', async (data) => {
	console.log('rejoin room', data.roomId);
	socket.join(data.roomId); // Join the user to a socket room
});


   socket.on('send_message', async (data) => {
    const { message, username, roomId } = data;
	//todo store message to mongodb
	const dataMessage = await messageController.saveMessage(data)

	console.log('data send back', data, dataMessage)
    io.in(roomId).emit('receive_message', data); // Send to all users in room, including sender
  });

});

server.listen(4000, () => 'Server is running on port 3000');