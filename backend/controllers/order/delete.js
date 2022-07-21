const Order = require("../../models/Order");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");

exports.deleteOrder = asyncErrors(async(req, res, next) =>{
    const order = await Order.findById(req.params.id);

    if(!order){
       return next(new ErrorHandler("No order found with this ID", 404));
    }
    await order.remove();
    res.status(200).json({
        message: "Order deleted"
    });
});