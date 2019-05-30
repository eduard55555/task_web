require('dotenv').config();
const path = require('path');
const express = require('express');  
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const io = require('socket.io').listen(server);
//TODO: убрать этот код из app.js
const Request = require('./models/request');
io.on('connection', (client) => {
  client.on('getRequests', (path) => {
    client.join(path);

    Request.find({'trap_id': path}, (err, data) => {
      data.forEach(element => {
        io.to(client.id).emit('messages', element);
      });
    });
  });

  client.on('getTraps', () => {
    Request.distinct('trap_id', (err, data) => {
      data.forEach(element => {
        io.to(client.id).emit('messagesTraps', element);
      });
    });
  });
});

const router = require('./router')(io);
app.use(router);


const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

const stop = () => {
  server.close();
};

module.exports = app;
module.exports.stop = stop;
