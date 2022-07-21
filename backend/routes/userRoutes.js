const express = require("express");
const router = express.Router();
// const User = require("../models/User");

const { regUser } = require("../controllers/users/regUser");
const { logUser } = require("../controllers/users/logUser");
const { getCurrentUser } = require("../controllers/users/currentUser");
const { updateUser } = require("../controllers/users/updateUser");
const { logoutUser } = require("../controllers/users/logoutUser");

const { getAllUsers, getOneUser } = require("../controllers/users/admin/adminReadUsers");
const { adminUpdateUser } = require("../controllers/users/admin/adminUpdateUsers");
const { adminDeleteUser } = require("../controllers/users/admin/adminDeleteUsers");

const { forgotPassword } = require("../controllers/password/forgotPass");
const { resetPassword } = require("../controllers/password/resetPass");
const { updatePassword } = require("../controllers/password/updatePass");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Users
router.route("/").post(regUser);
router.route("/login").post(logUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getCurrentUser);
router.route("/me/update").put(isAuthenticatedUser, updateUser);

// Admin User
router.route("/admin/userlist").get(isAuthenticatedUser, authorizeRoles("Admin"), getAllUsers);
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("Admin"), getOneUser)
.put(isAuthenticatedUser, authorizeRoles("Admin"), adminUpdateUser)
.delete(isAuthenticatedUser, authorizeRoles("Admin"), adminDeleteUser)

// Password
router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/reset/:token").put(resetPassword);

module.exports = router