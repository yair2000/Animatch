const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/order/create");
const { myOrders, getOrders, getSingleOrder } = require("../controllers/order/read");
const { updateOrder } = require("../controllers/order/update");
const { deleteOrder } = require("../controllers/order/delete");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("Admin"), getOrders);
router.route("/admin/order/:id")
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteOrder);

module.exports = router;