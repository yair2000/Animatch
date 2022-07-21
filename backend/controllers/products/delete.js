const Product = require("../../models/Product");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");

exports.deleteProduct = asyncErrors(async(req, res, next) =>{
    const deleteProduct = await Product.findById(req.params.id);

    if(!deleteProduct){
       return next(new ErrorHandler("Product Not Found", 404));
    }
    await Product.deleteOne();
    res.status(200).json({ success: true, message: "Delete Succeed" });
});

exports.deleteProductReview = asyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review =>
        review._id.toString() !== req.query.id.toString() // ID of the review
    );

    const totalReviews = reviews.length
    const ratings = product.reviews.reduce((acc, item) =>
    item.rating + acc, 0 / reviews.length);

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        totalReviews
    }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});