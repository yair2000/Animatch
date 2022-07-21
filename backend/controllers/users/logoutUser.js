const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");

exports.logoutUser = asyncErrors(async(req, res, next) =>{
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "Offline";
    await user.save();
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        message: "Logged out"
    });
});