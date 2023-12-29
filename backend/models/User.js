import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a username"],
    unique: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must contain at least 8 characters"]
  },
  picture: {
    public_id: String,
    url: String
  },
  role: {
    type: String,
    default: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {minimize: false});

UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  };
  this.password = await bcrypt.hash(this.password, 10);
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
  return resetToken;
}

UserSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.model("User", UserSchema);