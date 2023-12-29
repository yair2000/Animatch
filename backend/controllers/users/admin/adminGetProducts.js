import asyncErrors from "../../../middlewares/asyncErrors.js";
import Product from "../../../models/Product.js";

export const getAdminProducts = asyncErrors(async(req, res, next) =>{
  const products = await Product.find();
  res.status(200).json({ products });
});