const db = require("../config/db");

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                booking_id AS bookingId,
                customer_name AS customerName,
                room_number AS roomNumber,
                check_in_date AS checkInDate,
                check_out_date AS checkOutDate,
                number_of_guests AS numberOfGuests,
                status
            FROM bookings
            ORDER BY booking_id
        `);

        res.json(rows);

    } catch (error) {
        console.error("Get bookings error:", error);

        res.status(500).json({
            message: "Failed to retrieve bookings"
        });
    }
};


// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            customerName,
            roomNumber,
            checkInDate,
            checkOutDate,
            numberOfGuests
        } = req.body;

        if (
            !customerName ||
            !roomNumber ||
            !checkInDate ||
            !checkOutDate ||
            !numberOfGuests
        ) {
            return res.status(400).json({
                message: "All booking fields are required"
            });
        }

        const [result] = await db.query(
            `
            INSERT INTO bookings
            (
                customer_name,
                room_number,
                check_in_date,
                check_out_date,
                number_of_guests,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                customerName,
                roomNumber,
                checkInDate,
                checkOutDate,
                numberOfGuests,
                "Confirmed"
            ]
        );

        const [rows] = await db.query(
            `
            SELECT
                booking_id AS bookingId,
                customer_name AS customerName,
                room_number AS roomNumber,
                check_in_date AS checkInDate,
                check_out_date AS checkOutDate,
                number_of_guests AS numberOfGuests,
                status
            FROM bookings
            WHERE booking_id = ?
            `,
            [result.insertId]
        );

        res.status(201).json({
            message: "Booking created successfully",
            booking: rows[0]
        });

    } catch (error) {
        console.error("Create booking error:", error);

        res.status(500).json({
            message: "Failed to create booking"
        });
    }
};


// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);

        const [rows] = await db.query(
            `
            SELECT
                booking_id AS bookingId,
                customer_name AS customerName,
                room_number AS roomNumber,
                check_in_date AS checkInDate,
                check_out_date AS checkOutDate,
                number_of_guests AS numberOfGuests,
                status
            FROM bookings
            WHERE booking_id = ?
            `,
            [bookingId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error("Get booking error:", error);

        res.status(500).json({
            message: "Failed to retrieve booking"
        });
    }
};


// Update booking
const updateBooking = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);

        const [existingRows] = await db.query(
            "SELECT * FROM bookings WHERE booking_id = ?",
            [bookingId]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const existing = existingRows[0];

        const customerName =
            req.body.customerName ?? existing.customer_name;

        const roomNumber =
            req.body.roomNumber ?? existing.room_number;

        const checkInDate =
            req.body.checkInDate ?? existing.check_in_date;

        const checkOutDate =
            req.body.checkOutDate ?? existing.check_out_date;

        const numberOfGuests =
            req.body.numberOfGuests ?? existing.number_of_guests;

        const status =
            req.body.status ?? existing.status;

        await db.query(
            `
            UPDATE bookings
            SET
                customer_name = ?,
                room_number = ?,
                check_in_date = ?,
                check_out_date = ?,
                number_of_guests = ?,
                status = ?
            WHERE booking_id = ?
            `,
            [
                customerName,
                roomNumber,
                checkInDate,
                checkOutDate,
                numberOfGuests,
                status,
                bookingId
            ]
        );

        const [updatedRows] = await db.query(
            `
            SELECT
                booking_id AS bookingId,
                customer_name AS customerName,
                room_number AS roomNumber,
                check_in_date AS checkInDate,
                check_out_date AS checkOutDate,
                number_of_guests AS numberOfGuests,
                status
            FROM bookings
            WHERE booking_id = ?
            `,
            [bookingId]
        );

        res.json({
            message: "Booking updated successfully",
            booking: updatedRows[0]
        });

    } catch (error) {
        console.error("Update booking error:", error);

        res.status(500).json({
            message: "Failed to update booking"
        });
    }
};


// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const bookingId = parseInt(req.params.id);

        const [result] = await db.query(
            "DELETE FROM bookings WHERE booking_id = ?",
            [bookingId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking deleted successfully"
        });

    } catch (error) {
        console.error("Delete booking error:", error);

        res.status(500).json({
            message: "Failed to delete booking"
        });
    }
};


module.exports = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
};