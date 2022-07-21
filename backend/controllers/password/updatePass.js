const User = require("../../models/User");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");
const sendToken = require("../../utils/jwtToken");

exports.updatePassword = asyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.user.id).select("+password");
    const isMatchedPass = await user.comparePassword(req.body.oldPassword);

    if(!isMatchedPass){
       return next(new ErrorHandler("Old password is incorrect", 400));
    }
    user.password = req.body.password
    await user.save();
    sendToken(user, 200, res);
});