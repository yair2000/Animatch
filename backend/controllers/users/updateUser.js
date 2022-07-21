const User = require("../../models/User");
const asyncErrors = require("../../middleware/asyncErrors");

exports.updateUser = asyncErrors(async(req, res, next) =>{
    const newUser = {
       name: req.body.name,
       email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
       new: true,
       runValidators: true
    });
    res.status(200).json({
        message: `User with the name ${user.name} updated its credentials`
    });
});