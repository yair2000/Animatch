import asyncErrors from "../../../middlewares/asyncErrors.js";
import User from "../../../models/User.js";

export const adminUpdateUser = asyncErrors(async(req, res, next) =>{
  const newUser ={
    role: req.body.role
  }

  const user = await User.findByIdAndUpdate(req.params.id, newUser, { new: true });
  res.status(200).json({ message: `Admin Updated the role of ${user}` });
});