const User = require("../../../models/User");
const ErrorHandler = require("../../../utils/errorHandler");
const asyncErrors = require("../../../middleware/asyncErrors");

exports.adminDeleteUser = asyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.params.id);
    if(!user){
       return next(new ErrorHandler(`User with ID of: ${req.params.id} not found`));
    }
    await user.remove();

    res.status(200).json({message: "User Deleted"});
});