import { delete_file } from "../../utils/cloudinary.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deleteProduct = asyncErrors(async(req, res, next) =>{
  const product = await Product.findById(req?.params?.id);

  for(let i = 0; i < product?.images?.length; i++){
    await delete_file(product?.images[i].public_id);
  }
  await product.deleteOne();
  res.status(200).json({ message: "Delete Succeed" });
});

export const deleteProductReview = asyncErrors(async(req, res, next) =>{
  let product = await Product.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product?.reviews?.filter((review) =>
    review._id.toString() !== req?.query?.id.toString()
  );

  const totalReviews = reviews.length

  const rating = totalReviews === 0 ? 0
  : product.reviews.reduce((acc, item) => item.rating + acc, 0) / totalReviews;

  product = await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    rating,
    totalReviews
  }, { new: true });

  res.status(200).json({ success: true });
});