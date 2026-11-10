const express = require("express");

const { getRooms } = require("../controllers/roomController");
const { createBooking } = require("../controllers/bookingController");

const router = express.Router();

router.get("/rooms", getRooms);
router.post("/bookings", createBooking);

module.exports = router;
