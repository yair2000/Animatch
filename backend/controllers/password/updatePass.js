import User from "../../models/User.js";
import asyncErrors from "../../middlewares/asyncErrors.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js";

export const updatePassword = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req?.user?._id).select("+password");
  const isMatchedPass = await user.comparePassword(req.body.oldPassword);
  
  if(!isMatchedPass){
    return next(new ErrorHandler("Old Password Is Incorrect", 400));
  }

  if(req.body.oldPassword === req.body.password){
    return next(new ErrorHandler("New password must be different", 400));
  }

  user.password = req.body.password;
  user.save();
  sendToken(user, 200, res);
});