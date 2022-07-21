const express = require("express");
const cors = require("cors");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const app = express();

const rooms = ["Action", "Drama", "Comedy", "Romance"];
const users = require("./routes/userRoutes");
const products = require("./routes/productRoutes"); // Ecommerce
const order = require("./routes/orderRoutes"); // Ecommerce
const errorMiddleware = require("./middleware/errors"); // Ecommerce
const User = require("./models/User");
const Message = require("./models/Message");
const connection = require("./connection");
connection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Ecommerce
app.use(cors());
app.use("/users", users);
app.use("/api/v1", products); // Ecommerce
app.use("/api/v1", order); // Ecommerce
app.use(errorMiddleware); // Ecommerce

// Handle Uncaught exceptions
process.on("uncaughtException", err =>{
   console.log(`ERROR: ${ err.stack }`);
   console.log("An uncaught exception occured. The server will shut down".red.bgRed);
   process.exit(1);
});

const server = require("http").createServer(app);
const PORT = `${ process.env.PORT }`;
const io = require("socket.io")(server, {
    cors: {
       origin: "*",
       methods: ["GET", "POST"]
    }
});

app.get("/rooms", (req, res) =>{
   res.json(rooms);
});

async function getLastRoomMessages(room){
   let roomMessages = await Message.aggregate([
      {$match: { to: room }},
      {$group: { _id: `$date`, messagesByDate: {$push: '$$ROOT' }}} // Creates a group of messages for each date
   ]);
   return roomMessages;
}

function sortRoomMessagesByDate(messages){
   return messages.sort(function(a, b){
      let date1 = a._id.split("/");
      let date2 = b._id.split("/");

      // Date Format: Day/Month/Year
      date1 = date1[1] + date1[2] + date1[0] // 0=Year, 1=Day, 2=Month
      date2 = date2[1] + date2[2] + date2[0]

      date1 || date2 < 1 ? "0" + date1 : date1

      return date1 < date2 ? -1 : 1
   });
}

// Socket Connection
io.on("connection", (socket) =>{
   
   socket.on("new-user", async() =>{
      const members = await User.find();
      io.emit("new-user", members);
   });

   socket.on("join-room", async(newRoom, previousRoom) =>{
      socket.join(newRoom);
      socket.leave(previousRoom);
      let roomMessages = await getLastRoomMessages(newRoom);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      socket.emit("room-messages", roomMessages);
   });

   socket.on("message-room", async(room, content, sender, time, date) =>{
      const newMessage = await Message.create({ content, from: sender, time, date, to: room });
      let roomMessages = await getLastRoomMessages(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      roomMessages.push(newMessage);
      io.to(room).emit("room-messages", roomMessages); // Sending the message to the message room
      socket.broadcast.emit("notifications", room);
   });

   app.delete("/logout", async(req, res) =>{
      try{
        const { _id, newMessages } = req.body;
        const user = await User.findById(_id);
        user.status = "Offline";
        user.newMessages = newMessages;
        await user.save();

        const members = await User.find();
        socket.broadcast.emit("new-user", members);
        res.status(200).send();
      }
      catch(err){
         console.log(err);
         res.status(400).send();
      }
   });
});

const serverHandler = server.listen(PORT, () =>{
   console.log(`Server connected to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled Promise rejections
process.on("unhandledRejection", err =>{
   console.log(`ERROR: ${ err.message }`);
   console.log("Shutting down server");
   serverHandler.close(() =>{
      process.exit(1);
   });
});