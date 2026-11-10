const bcrypt = require("bcryptjs");
const {
    createSessionToken,
    getSessionExpiry,
    hashSessionToken,
    normalizeEmail,
    passwordHashForTiming,
    validateEmail,
    validatePassword
} = require("../services/authService");
const db = require("../config/db");

const invalidCredentialsResponse = {
    message: "Invalid email or password"
};

const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = normalizeEmail(req.body?.email);

        if (!email || typeof password !== "string") {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const [rows] = await db.query(
            `
            SELECT
                user_id,
                email,
                password_hash,
                role
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        const user = rows[0];
        const passwordMatches = await bcrypt.compare(
            password,
            user?.password_hash || passwordHashForTiming
        );

        if (!user || !passwordMatches) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const token = createSessionToken();
        await db.query(
            "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
            [user.user_id, hashSessionToken(token), getSessionExpiry()]
        );

        res.cookie("hotel_session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 8 * 60 * 60 * 1000,
            path: "/"
        });

        res.json({
            message: "Login successful",
            user: {
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Authentication failed"
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        await db.query("DELETE FROM sessions WHERE session_id = ?", [req.sessionId]);
        res.clearCookie("hotel_session", { httpOnly: true, sameSite: "lax", path: "/" });
        return res.json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Logout failed" });
    }
};

const getCurrentUser = (req, res) => res.json({
    user: {
        email: req.user.email,
        role: req.user.role
    }
});

const registerGuest = async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const { password } = req.body || {};

    if (!validateEmail(email) || !validatePassword(password)) {
        return res.status(400).json({
            message: "A valid email and a password of 6 to 128 characters are required"
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 12);
        await db.query(
            "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'guest')",
            [email, passwordHash]
        );
        return res.status(201).json({ message: "Guest account created" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "An account with that email already exists" });
        }
        console.error("Guest account creation error:", error);
        return res.status(500).json({ message: "Unable to create guest account" });
    }
};

const createStaffAccount = async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const { password } = req.body || {};

    if (!email || !validatePassword(password)) {
        return res.status(400).json({
            message: "A valid email and a password of 6 to 128 characters are required"
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 12);
        await db.query(
            "INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'staff')",
            [email, passwordHash]
        );
        return res.status(201).json({ message: "Staff account created" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "An account with that email already exists" });
        }
        console.error("Staff account creation error:", error);
        return res.status(500).json({ message: "Unable to create staff account" });
    }
};

const resetStaffPassword = async (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const { password } = req.body || {};

    if (!email || !validatePassword(password)) {
        return res.status(400).json({
            message: "A valid email and a password of 6 to 128 characters are required"
        });
    }

    try {
        const [result] = await db.query(
            "UPDATE users SET password_hash = ? WHERE email = ? AND role = 'staff'",
            [await bcrypt.hash(password, 12), email]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Staff account not found" });
        }
        await db.query(
            `DELETE FROM sessions
             WHERE user_id = (SELECT user_id FROM users WHERE email = ? AND role = 'staff')`,
            [email]
        );
        return res.json({ message: "Staff password reset successfully" });
    } catch (error) {
        console.error("Staff password reset error:", error);
        return res.status(500).json({ message: "Unable to reset staff password" });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    getCurrentUser,
    registerGuest,
    createStaffAccount,
    resetStaffPassword
};