import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";

export const getCurrentUser = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req?.user?._id);
  res.status(200).json({ user });
});