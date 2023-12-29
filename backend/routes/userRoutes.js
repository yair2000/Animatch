import express from "express";
const router = express.Router();

import { regUser } from "../controllers/users/regUser.js";
import { logUser } from "../controllers/users/logUser.js";
import { logoutUser } from "../controllers/users/logoutUser.js";
import { getCurrentUser } from "../controllers/users/currentUser.js";
import { updateUser } from "../controllers/users/updateUser.js";

import { adminDeleteUser } from "../controllers/users/admin/adminDeleteUsers.js";
import { adminUpdateUser } from "../controllers/users/admin/adminUpdateUsers.js";
import { getAllUsers, getOneUser } from "../controllers/users/admin/adminReadUsers.js";

import { forgotPassword } from "../controllers/password/forgotPass.js";
import { resetPassword } from "../controllers/password/resetPass.js";
import { updatePassword } from "../controllers/password/updatePass.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

router.route("/register").post(regUser);
router.route("/login").post(logUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getCurrentUser);
router.route("/me/update").put(isAuthenticatedUser, updateUser);

// Admin
router.route("/admin/userlist").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllUsers);
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("Admin"), getOneUser)
.put(isAuthenticatedUser, authorizeRoles("Admin"), adminUpdateUser)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), adminDeleteUser);

// Password
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

export default router;