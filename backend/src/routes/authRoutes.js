const express = require("express");

const {
    loginUser,
    logoutUser,
    getCurrentUser,
    createStaffAccount,
    resetStaffPassword
} = require("../controllers/authController");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", requireAuth, logoutUser);
router.get("/me", requireAuth, getCurrentUser);
router.post("/staff", requireAuth, requireAdmin, createStaffAccount);
router.post("/staff/reset-password", requireAuth, requireAdmin, resetStaffPassword);

module.exports = router;