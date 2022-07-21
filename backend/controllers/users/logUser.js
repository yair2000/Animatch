const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");

exports.logUser = asyncErrors(async(req, res, next) =>{
    try{
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      const token = user.getJwtToken(); // Create JWT Token
      const options = {
         expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
         ),
         httpOnly: true
      }
      user.status = "Online";
      await user.save();
      res.status(200)
      .cookie("token", token, options)
      .json(user);
    }
    catch(e){
      res.status(400).json(e.message);
    }
});