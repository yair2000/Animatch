const Product = require("../../models/Product");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");

// Admin Route
exports.updateProduct = asyncErrors(async(req, res, next) =>{
    let updateProduct = await Product.findById(req.params.id)

    if(!updateProduct){
       return next(new ErrorHandler("Product Not Found", 404));
    }
    updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, updateProduct });
});