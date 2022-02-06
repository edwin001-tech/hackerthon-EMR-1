const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const routers = require('./routers');
const cors = require('cors');

const url = 'mongodb://localhost/emr';
const app = express();

const {addUser, getUser, getUserInRooms} = require('./users');

//connnecting to mongodb database
mongoose.connect(url, {useNewUrlParser:true});
mongoose.connection.once('open', function(){
    console.log('connection made to the databse')
}).on('error', (error) => {
    console.log('error is', error);
});

app.use(bodyParser.json())
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('we have a connection')

    socket.on('join', ({name, room}, callback) => {
        const {} = addUser({id: socket.id, name, room});

        socket.join(room);
        if (callback) callback();
    });

    socket.on('sendMessage', (message, callback) => {
        let cur_user = getUser(socket.id);
        console.log(cur_user)
        console.log(message)
        io.to(cur_user.room).emit('message', {user: cur_user.name, text: message});
    });

    socket.on('disconnect', () => {
        console.log('user has left')
    });
});

const PORT = 9000;
app.use('/user', cors(), routers);
app.use(routers)

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
