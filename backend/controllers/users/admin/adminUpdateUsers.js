const User = require("../../../models/User");
const asyncErrors = require("../../../middleware/asyncErrors");

exports.adminUpdateUser = asyncErrors(async(req, res, next) =>{
    const newUser = {
       name: req.body.name,
       email: req.body.email,
       role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUser, {
       new: true,
       runValidators: true
    });
    res.status(200).json({ message: "Admin Updated" });
});