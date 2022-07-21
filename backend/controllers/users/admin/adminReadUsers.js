const User = require("../../../models/User");
const ErrorHandler = require("../../../utils/errorHandler");
const asyncErrors = require("../../../middleware/asyncErrors");

exports.getAllUsers = asyncErrors(async(req, res, next) =>{
    const users = await User.find();
    res.status(200).json(users);
});

exports.getOneUser = asyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.params.id);
    if(!user){
       return next(new ErrorHandler(`User with ID of: ${req.params.id} not found`));
    }
    res.status(200).json(user);
});