import asyncErrors from "../../../middlewares/asyncErrors.js";
import User from "../../../models/User.js";
import ErrorHandler from "../../../utils/errorHandler.js";

export const getAllUsers = asyncErrors(async(req, res, next) =>{
  const users = await User.find();
  res.status(200).json({ users });
});

export const getOneUser = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User with ID of: ${req.params.id} not found`), 404);
  }
  res.status(200).json({ user });
});