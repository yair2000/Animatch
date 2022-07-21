const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");
const ErrorHandler = require("../../utils/errorHandler");
const sendEmail = require("../../utils/sendEmail");

exports.forgotPassword = asyncErrors(async(req, res, next) =>{
    const user = await User.findOne({ email: req.body.email });

    if(!user){
       return next(new ErrorHandler("User not found with this email", 404));
    }

    // Reset Token Functionality
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get("host")}/users/password/reset/${resetToken}`;
    const message = `Your password reset token is: \n\n${resetUrl}\n\nIf this was done by mistake, ignore it`

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

      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
});