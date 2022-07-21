const Product = require("../../models/Product");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");
const APIFeatures = require("../../utils/apiFeatures");

exports.getProducts = asyncErrors(async(req, res, next) =>{
    // return next(new ErrorHandler("No Products Found", 400));
    const resPerPage = 4
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()

    let products = await apiFeatures.query
    let filterProductsCount = products.length

    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filterProductsCount,
        products
    });
}),

exports.getProductReviews = asyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
}),

exports.getProduct = asyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({ success: true, product });
});