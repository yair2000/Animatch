import { delete_file, upload_file } from "../../utils/cloudinary.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";

export const updateUser = asyncErrors(async(req, res, next) =>{
  const newUser ={
    name: req.body.name,
    email: req.body.email,
  }
 
  if(req.body.picture !== ""){
    const newPicture = await upload_file(req.body.picture, "Profile_Pictures");
 
    newUser.picture ={
      public_id: newPicture.public_id,
      url: newPicture.url
    }

    if(req?.user?.picture?.url){
      await delete_file(req?.user?.picture?.public_id);
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUser, { new: true });
 
  res.status(200).json({ user });
});