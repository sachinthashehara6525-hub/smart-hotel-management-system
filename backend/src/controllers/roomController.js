const db = require("../config/db");

const roomSelect = `
    SELECT
        room_id AS roomId,
        room_number AS number,
        room_type AS type,
        price_per_night AS price,
        status
    FROM rooms
`;

const isMissing = (value) =>
    value === undefined || value === null || value === "";

const validateRoomInput = ({ roomNumber, roomType, pricePerNight, status }) => {
    if (
        isMissing(roomNumber) ||
        isMissing(roomType) ||
        isMissing(pricePerNight) ||
        isMissing(status)
    ) {
        return "All room fields are required";
    }

    if (!Number.isFinite(Number(roomNumber))) {
        return "Room number must be a number";
    }

    if (!Number.isFinite(Number(pricePerNight))) {
        return "Price per night must be a number";
    }

    return null;
};

const getRooms = async (req, res) => {
    try {
        const [rows] = await db.query(`${roomSelect} ORDER BY room_id`);
        res.json(rows);
    } catch (error) {
        console.error("Get rooms error:", error);

        res.status(500).json({
            message: "Failed to retrieve rooms"
        });
    }
};

const createRoom = async (req, res) => {
    try {
        const {
            roomNumber,
            roomType,
            pricePerNight,
            status
        } = req.body;

        const validationError = validateRoomInput({
            roomNumber,
            roomType,
            pricePerNight,
            status
        });

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO rooms
            (
                room_number,
                room_type,
                price_per_night,
                status
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                roomNumber,
                roomType,
                pricePerNight,
                status
            ]
        );

        const [rows] = await db.query(
            `${roomSelect} WHERE room_id = ?`,
            [result.insertId]
        );

        res.status(201).json({
            message: "Room created successfully",
            room: rows[0]
        });
    } catch (error) {
        console.error("Create room error:", error);

        res.status(500).json({
            message: "Failed to create room"
        });
    }
};

const getRoomById = async (req, res) => {
    try {
        const roomId = parseInt(req.params.id, 10);

        const [rows] = await db.query(
            `${roomSelect} WHERE room_id = ?`,
            [roomId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Get room error:", error);

        res.status(500).json({
            message: "Failed to retrieve room"
        });
    }
};

const updateRoom = async (req, res) => {
    try {
        const roomId = parseInt(req.params.id, 10);

        const [existingRows] = await db.query(
            "SELECT * FROM rooms WHERE room_id = ?",
            [roomId]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        const existing = existingRows[0];
        const room = {
            roomNumber: req.body.roomNumber ?? existing.room_number,
            roomType: req.body.roomType ?? existing.room_type,
            pricePerNight: req.body.pricePerNight ?? existing.price_per_night,
            status: req.body.status ?? existing.status
        };

        const validationError = validateRoomInput(room);

        if (validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        await db.query(
            `
            UPDATE rooms
            SET
                room_number = ?,
                room_type = ?,
                price_per_night = ?,
                status = ?
            WHERE room_id = ?
            `,
            [
                room.roomNumber,
                room.roomType,
                room.pricePerNight,
                room.status,
                roomId
            ]
        );

        const [updatedRows] = await db.query(
            `${roomSelect} WHERE room_id = ?`,
            [roomId]
        );

        res.json({
            message: "Room updated successfully",
            room: updatedRows[0]
        });
    } catch (error) {
        console.error("Update room error:", error);

        res.status(500).json({
            message: "Failed to update room"
        });
    }
};

module.exports = {
    getRooms,
    createRoom,
    getRoomById,
    updateRoom
};