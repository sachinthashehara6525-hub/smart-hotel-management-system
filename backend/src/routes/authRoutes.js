const express = require("express");

const router = express.Router();

// Login API
router.post("/login", (req, res) => {
    res.json({
        message: "Login API is working"
    });
});

// Register API
router.post("/register", (req, res) => {
    res.json({
        message: "Register API is working"
    });
});

module.exports = router;