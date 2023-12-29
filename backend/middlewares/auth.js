import jwt from "jsonwebtoken";

import asyncErrors from "./asyncErrors.js"
import User from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = asyncErrors(async (req, res, next) =>{
  const { token } = req.cookies

  if(!token){
    return next(new ErrorHandler("Login to gain access to this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the user's token
  req.user = await User.findById(decoded.id);
  next();
});

export const authorizeRoles = (...roles) =>{
  return (req, res, next) =>{
    if(!roles.includes(req.user.role)){
      return next(
        new ErrorHandler(`Role (${req.user.role}) cannot access this resource`, 403));
    }
    next();
  }
};