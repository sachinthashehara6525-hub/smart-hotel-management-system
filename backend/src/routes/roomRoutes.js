const express = require("express");

const {
    getRooms,
    createRoom,
    getRoomById,
    updateRoom
} = require("../controllers/roomController");

const router = express.Router();

router.get("/", getRooms);
router.post("/", createRoom);
router.get("/:id", getRoomById);
router.put("/:id", updateRoom);

module.exports = router;