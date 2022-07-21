const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");

exports.regUser = asyncErrors(async(req, res, next) =>{
    try{
      const { name, email, password, picture } = req.body;
      const user = await User.create({ name, email, password, picture });
      const token = user.getJwtToken(); // Create JWT Token
      const options = {
         expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
         ),
         httpOnly: true,
         path: "/"
      }
      res.status(200)
      .cookie("token", token, options)
      .json(user);
    }
    catch(e){
      let errorMsg;
      if(e.code === 11000){
        errorMsg = "User and/or Email Address already exists"
      }
      else{
        errorMsg = e.message;
      }
      console.log(e);
      res.status(400).json(errorMsg);
    }
});