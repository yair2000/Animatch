const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   content: String,
   from: Object,
   socketID: String,
   time: String,
   date: String,
   to: String
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;