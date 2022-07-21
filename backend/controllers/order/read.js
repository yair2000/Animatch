const Order = require("../../models/Order");
const ErrorHandler = require("../../utils/errorHandler");
const asyncErrors = require("../../middleware/asyncErrors");

// Orders of logged in users
exports.myOrders = asyncErrors(async(req, res, next) =>{
    const order = await Order.find({ user: req.user.id });
    res.status(200).json(order);
});

exports.getOrders = asyncErrors(async(req, res, next) =>{
    const orders = await Order.find();

    let orderAmount = 0;
    orders.forEach(order =>{
        orderAmount += order.totalPrice
    })

    res.status(200).json(orderAmount);
});

exports.getSingleOrder = asyncErrors(async(req, res, next) =>{
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
       return next(new ErrorHandler("No order found with this ID", 404));
    }
    res.status(200).json(order);
});