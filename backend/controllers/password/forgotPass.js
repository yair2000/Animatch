import { resetPasswordTemplate } from "../../utils/emailTemplate.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js"
import sendEmail from "../../utils/sendEmail.js";

export const forgotPassword = asyncErrors(async(req, res, next) =>{
  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Reset Token Functionality
  const resetToken = user.getResetPasswordToken();
  await user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = resetPasswordTemplate(user?.name, resetUrl);
  
  try{
    await sendEmail({
      email: user.email,
      subject: "Animatch Password Recovery",
      message
   });
   res.status(200).json({
     success: true,
     message: `The Email has been sent to: ${user.email}`
   });
  }
  catch(error){
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    
    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
  sendToken(user, 200, res);
});