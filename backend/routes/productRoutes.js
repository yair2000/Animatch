const express = require("express");
const router = express.Router();

const { newProduct, newProductReview } = require("../controllers/products/create");
const { getProducts, getProductReviews, getProduct } = require("../controllers/products/read");
const { updateProduct } = require("../controllers/products/update");
const { deleteProduct, deleteProductReview } = require("../controllers/products/delete");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("Admin"), newProduct);
router.route("/admin/product/:id")
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteProduct);

// Review Routes
router.route("/review").put(isAuthenticatedUser, newProductReview);
router.route("/reviews")
.get(isAuthenticatedUser, getProductReviews)
.delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;