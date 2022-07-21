const Order = require("../../models/Order");
const asyncErrors = require("../../middleware/asyncErrors");

exports.newOrder = asyncErrors(async(req, res, next) =>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
       orderItems,
       shippingInfo,
       itemsPrice,
       taxPrice,
       shippingPrice,
       totalPrice,
       paymentInfo,
       paymentDate: Date.now(),
       user: req.user._id
    });

    res.status(200).json(order);
});