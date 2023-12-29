import { delete_file } from "../../../utils/cloudinary.js";

import asyncErrors from "../../../middlewares/asyncErrors.js";
import User from "../../../models/User.js";
import ErrorHandler from "../../../utils/errorHandler.js";

export const adminDeleteUser = asyncErrors(async(req, res, next) =>{
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorHandler(`User with ID of: ${req.params.id} not found`), 404);
  }
  if(user?.picture?.public_id){
    await delete_file(user?.picture?.public_id);
  }
  await user.deleteOne();
  
  res.status(200).json({ message: "User Deleted" });
});