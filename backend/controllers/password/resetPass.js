import crypto from "crypto";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js";

export const resetPassword = asyncErrors(async(req, res, next) =>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new ErrorHandler("Invalid or expired reset token", 404));
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Set a new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});