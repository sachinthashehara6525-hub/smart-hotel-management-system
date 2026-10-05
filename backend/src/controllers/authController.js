const bcrypt = require("bcryptjs");
const db = require("../config/db");

const invalidCredentialsResponse = {
    message: "Invalid email or password"
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
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

        if (rows.length === 0) {
            return res.status(401).json(invalidCredentialsResponse);
        }

        const user = rows[0];
        const passwordMatches = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).json(invalidCredentialsResponse);
        }

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

module.exports = {
    loginUser
};