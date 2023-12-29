import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import ErrorHandler from "../../utils/errorHandler.js";
import sendToken from "../../utils/jwtToken.js"

export const logUser = asyncErrors(async(req, res, next) =>{
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  const isMatch = await user.comparePassword(password);

  if(!email || !password){
    return next(new ErrorHandler("Please enter Email and/or Password", 400));
  }
  if(!user){
    return next(new ErrorHandler("Invalid Email and/or Password", 401));
  }
  if(!isMatch){
    return next (new ErrorHandler("Invalid Email and/or Password", 401))
  };

  sendToken(user, 200, res);
});