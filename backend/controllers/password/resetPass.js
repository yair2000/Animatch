const crypto = require("crypto");
const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");
const ErrorHandler = require("../../utils/errorHandler");
const sendToken = require("../../utils/jwtToken");

exports.resetPassword = asyncErrors(async(req, res, next) =>{
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
    await user.save({ validateBeforeSave: false });
    sendToken(user, 200, res);
});