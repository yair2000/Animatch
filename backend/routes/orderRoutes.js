import express from "express";
const router = express.Router();

import { newOrder } from "../controllers/orders/create.js";
import { myOrders, getOrders, getSingleOrder } from "../controllers/orders/read.js";
import { updateOrder } from "../controllers/orders/update.js";
import { deleteOrder } from "../controllers/orders/delete.js";
import { getSales } from "../controllers/users/admin/adminGetSales.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/profile/orders").get(isAuthenticatedUser, myOrders);

// Admin Routes
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("Admin"), getOrders);
router.route("/admin/order/:id")
.put(isAuthenticatedUser, authorizeRoles("Admin"), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteOrder);
router.route("/admin/get_sales").get(isAuthenticatedUser, authorizeRoles("Admin"), getSales);
export default router;