import express from "express";
const router = express.Router();

import { getProduct, getProducts, getProductReviews } from "../controllers/products/read.js";
import { newProduct, newProductReview } from "../controllers/products/create.js";
import { updateProduct } from "../controllers/products/update.js";
import { deleteProduct, deleteProductReview } from "../controllers/products/delete.js";
import { getAdminProducts } from "../controllers/users/admin/adminGetProducts.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/product/new").post(newProduct);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("Admin"), getAdminProducts);
router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct);

// Review Routes
router.route("/review")
.get(isAuthenticatedUser, getProductReviews)
.put(isAuthenticatedUser, newProductReview);

router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProductReview);

export default router;