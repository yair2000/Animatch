import asyncErrors from "../../middlewares/asyncErrors.js";

import Order from "../../models/Order.js";

export const newOrder = asyncErrors(async(req, res, next) =>{
  const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentMethod,
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
     paymentMethod,
     paymentDate: Date.now(),
     user: req.user._id
  });

  res.status(200).json(order);
});