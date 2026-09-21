const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Smart Hotel Management System API is running"
    });
});

app.get("/api/rooms", (req, res) => {
    res.json({
        message: "Rooms API is working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});