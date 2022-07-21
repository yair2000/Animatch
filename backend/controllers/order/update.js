const Product = require("../../models/Product");
const Order = require("../../models/Order");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");

exports.updateOrder = asyncErrors(async(req, res, next) =>{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === "Delivered"){
       return next(new ErrorHandler("This order has already been delivered", 400));
    }
    order.orderItems.forEach(async item =>{
        await updateStock(item.product, item.quantity);
    });
    order.orderStatus = req.body.status;
    order.delivaryDate = Date.now();
    await order.save();

    res.status(200).json({
        message: `Product ${req.params.id} status changed`
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}