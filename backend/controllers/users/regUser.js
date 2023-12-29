import { upload_file } from "../../utils/cloudinary.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import User from "../../models/User.js";
import sendToken from "../../utils/jwtToken.js";

export const regUser = asyncErrors(async(req, res, next) =>{
  const { name, email, password } = req.body;
  const result = await upload_file(req.body.picture, "Profile_Pictures");
  
  const user = await User.create({
    name,
    email,
    password,
    picture: {
      public_id: result.public_id,
      url: result.url
    }
  });
  sendToken(user, 201, res);
});