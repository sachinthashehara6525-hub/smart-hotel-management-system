const crypto = require("crypto");

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const passwordHashForTiming = "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

const normalizeEmail = (email) => (
    typeof email === "string" ? email.trim().toLowerCase() : ""
);

const validatePassword = (password) => (
    typeof password === "string" &&
    password.length >= 6 &&
    password.length <= 128
);

const validateEmail = (email) => (
    typeof email === "string" &&
    email.length <= 255 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
);

const createSessionToken = () => crypto.randomBytes(32).toString("base64url");

const hashSessionToken = (token) => (
    crypto.createHash("sha256").update(token).digest("hex")
);

const getSessionExpiry = () => new Date(Date.now() + SESSION_TTL_MS);

module.exports = {
    SESSION_TTL_MS,
    passwordHashForTiming,
    normalizeEmail,
    validateEmail,
    validatePassword,
    createSessionToken,
    hashSessionToken,
    getSessionExpiry
};
