import asyncErrors from "../../middlewares/asyncErrors.js";
import Order from "../../models/Order.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getSingleOrder = asyncErrors(async(req, res, next) =>{
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if(!order){
     return next(new ErrorHandler("No order found with this ID", 404));
  }
  res.status(200).json({ order });
});

// Orders of logged in users
export const myOrders = asyncErrors(async(req, res, next) =>{
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({ orders });
});

export const getOrders = asyncErrors(async(req, res, next) =>{
  const orders = await Order.find();
  res.status(200).json({ orders });
});