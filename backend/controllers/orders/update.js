import asyncErrors from "../../middlewares/asyncErrors.js";

import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const updateOrder = asyncErrors(async(req, res, next) =>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  if(order?.orderStatus === "Delivered"){
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  let productNotFound = false;

  // Update products stock
  for(const item of order.orderItems){
    const product = await Product.findById(item?.product?.toString());
    if(!product){
      productNotFound = true;
      break;
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  if(productNotFound){
    return next(new ErrorHandler("No Product found with one or more IDs.", 404));
  }
  order.orderStatus = req.body.status;
  order.delivaryDate = Date.now();
  await order.save();

  res.status(200).json({
    message: `Product ${req.params.id} status changed`
  });
});