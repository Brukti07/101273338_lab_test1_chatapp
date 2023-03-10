const path = require('path');
const http = require('http');
const express =  require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.emit('message', 'Welcome to ChatApp');

    socket.broadcast.emit('message','Auser has joiend the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'Auser has left the chat');


    });
   
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

