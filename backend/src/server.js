const express = require("express");
const cors = require("cors");
require("dotenv").config();

const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const customerRoutes = require("./routes/customerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const db = require("./config/db");

const { requireAuth, requireStaffOrAdmin } = require("./middleware/auth");

const createApp = () => {
    const app = express();

    app.use(cors({
        origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
        credentials: true
    }));
    app.use(express.json());

    app.use("/api/rooms", requireAuth, requireStaffOrAdmin, roomRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/bookings", requireAuth, requireStaffOrAdmin, bookingRoutes);
    app.use("/api/customers", requireAuth, requireStaffOrAdmin, customerRoutes);
    app.use("/api/dashboard", requireAuth, requireStaffOrAdmin, dashboardRoutes);

    app.get("/", (req, res) => {
        res.json({
            message: "Smart Hotel Management System API is running"
        });
    });

    return app;
};

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    db.initializeAuthSchema()
        .then(() => createApp().listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        }))
        .catch((error) => {
            console.error("Unable to initialize authentication schema:", error);
            process.exitCode = 1;
        });
}

module.exports = { createApp };