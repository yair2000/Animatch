import { upload_file } from "../../utils/cloudinary.js";

import asyncErrors from "../../middlewares/asyncErrors.js";
import Product from "../../models/Product.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const newProduct = asyncErrors(async(req, res, next) =>{
  let productImage = [];
  const productWithOutImages = { ...req.body, images: productImage };
  const product = await Product.create(productWithOutImages);

  if(!productImage){
    return next(new ErrorHandler("Product not found", 404));
  }
  const uploader = async(image) => upload_file(image, req.body.images.length > 1 ? `Products/${product.name}` : "Products");
  const urls = await Promise.all((req?.body?.images).map(uploader));
  product?.images?.push(...urls);
  await product?.save();

  res.status(200).json({ product });
});

export const newProductReview = asyncErrors(async(req, res, next) =>{
  const { rating, comment, productId } = req.body;
  const review ={
    user: req?.user?._id,
    name: req?.user?.name,
    rating: Number(rating),
    comment
  }
  const product = await Product.findById(productId);

  const isReviewed = product?.reviews.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if(isReviewed){
    product.reviews.forEach(review =>{
      if(review?.user?.toString() === req?.user?._id.toString()){
        review.comment = comment;
        review.rating = rating;
      }
    });
  }
  else{
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
  }

  product.rating = product.reviews.reduce((acc, item) =>
  item.rating + acc, 0) / product.reviews.length

  await product.save();
  res.status(200).json({ success: true });
});