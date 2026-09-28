const getRooms = (req, res) => {
    res.json({
        message: "Room API is working"
    });
};

const createRoom = (req, res) => {
    const room = req.body;

    res.status(201).json({
        message: "Room created successfully",
        room: room
    });
};

const getRoomById = (req, res) => {
    const roomId = req.params.id;

    res.json({
        message: "Room retrieved successfully",
        roomId: roomId
    });
};

const updateRoom = (req, res) => {
    const roomId = req.params.id;
    const updatedRoom = req.body;

    res.json({
        message: "Room updated successfully",
        roomId: roomId,
        room: updatedRoom
    });
};

module.exports = {
    getRooms,
    createRoom,
    getRoomById,
    updateRoom
};