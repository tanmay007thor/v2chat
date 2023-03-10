const express = require('express');
const app = express();
const cors = require("cors");
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')
const socket = require("socket.io");
const auth = require('./middleware/authentication')
app.use(cors());

require('./db/config')
app.get('/', (req, res) => {
  res.send('<h1>Hello </h1>');
});
var fileupload = require("express-fileupload");
app.use(fileupload());

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server , {
    cors : {
        origin : "*" ,
        Credential : true
    } ,
})
// app.get('/api/messages' , () =>{console.log('hey there')})
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/auth' , authRoutes)
app.use('/api/messages' ,auth ,  messageRoutes)

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {s
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
