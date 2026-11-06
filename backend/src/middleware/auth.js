const db = require("../config/db");
const { hashSessionToken } = require("../services/authService");

const parseCookies = (cookieHeader = "") => cookieHeader.split(";").reduce((cookies, part) => {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) return cookies;

    const name = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    cookies[name] = decodeURIComponent(value);
    return cookies;
}, {});

const requireAuth = async (req, res, next) => {
    try {
        const token = parseCookies(req.headers.cookie).hotel_session;
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const [rows] = await db.query(
            `SELECT s.session_id, u.user_id, u.email, u.role
             FROM sessions s
             INNER JOIN users u ON u.user_id = s.user_id
             WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP()`,
            [hashSessionToken(token)]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Authentication required" });
        }

        req.user = rows[0];
        req.sessionId = rows[0].session_id;
        return next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({ message: "Authentication failed" });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Administrator access required" });
    }
    return next();
};

module.exports = { requireAuth, requireAdmin };
