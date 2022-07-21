const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { throws } = require("assert");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: {
     type: String,
     required: [true, "Please add a username"],
     unique: true
   },
   email: {
     type: String,
     lowercase: true,
     required: [true, "Please add an email address"],
     unique: true,
     validate: [isEmail, "Invalid Email Address"]
   },
   password: {
     type: String,
     required: [true, "Please add a password"],
     minlength: [6, "Password must contain at least 6 characters"]
   },
   picture: {
     type: String
   },
   role: {
     type: String,
     default: "User"
   },
   newMessage: {
     type: Object,
     default: {}
   },
   status: {
     type: String,
     default: "Online"
   },
   date: {
     type: Date,
     default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {minimize: false});

UserSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return next();
  
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash){
          if(err) return next(err);
          user.password = hash
          next();
    });
  });
});
  
UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex"); // Token Encryption
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 // Token expiration time
    return resetToken
}

UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
  
UserSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({ email });
    if(!user) throw new Error("Invalid Email Or Password");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Invalid Email Or Password");
    return user
}
const User = mongoose.model("User", UserSchema);
module.exports = User;