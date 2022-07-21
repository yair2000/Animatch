const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");

exports.getCurrentUser = asyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
});