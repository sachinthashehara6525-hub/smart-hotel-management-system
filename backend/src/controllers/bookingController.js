let bookings = [
    {
        bookingId: 1,
        customerName: "John Doe",
        roomNumber: 101,
        checkInDate: "2026-10-01",
        checkOutDate: "2026-10-05",
        numberOfGuests: 2,
        status: "Confirmed"
    }
];

// Get all bookings
const getBookings = (req, res) => {
    res.json(bookings);
};

// Create a new booking
const createBooking = (req, res) => {
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

    const newBooking = {
        bookingId: bookings.length + 1,
        customerName,
        roomNumber,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        status: "Confirmed"
    };

    bookings.push(newBooking);

    res.status(201).json({
        message: "Booking created successfully",
        booking: newBooking
    });
};

// Get booking by ID
const getBookingById = (req, res) => {
    const bookingId = parseInt(req.params.id);

    const booking = bookings.find(
        (booking) => booking.bookingId === bookingId
    );

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    res.json(booking);
};

// Update booking
const updateBooking = (req, res) => {
    const bookingId = parseInt(req.params.id);

    const booking = bookings.find(
        (booking) => booking.bookingId === bookingId
    );

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    const {
        customerName,
        roomNumber,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        status
    } = req.body;

    if (customerName !== undefined) {
        booking.customerName = customerName;
    }

    if (roomNumber !== undefined) {
        booking.roomNumber = roomNumber;
    }

    if (checkInDate !== undefined) {
        booking.checkInDate = checkInDate;
    }

    if (checkOutDate !== undefined) {
        booking.checkOutDate = checkOutDate;
    }

    if (numberOfGuests !== undefined) {
        booking.numberOfGuests = numberOfGuests;
    }

    if (status !== undefined) {
        booking.status = status;
    }

    res.json({
        message: "Booking updated successfully",
        booking
    });
};

// Delete booking
const deleteBooking = (req, res) => {
    const bookingId = parseInt(req.params.id);

    const bookingIndex = bookings.findIndex(
        (booking) => booking.bookingId === bookingId
    );

    if (bookingIndex === -1) {
        return res.status(404).json({
            message: "Booking not found"
        });
    }

    const deletedBooking = bookings.splice(bookingIndex, 1);

    res.json({
        message: "Booking deleted successfully",
        booking: deletedBooking[0]
    });
};

module.exports = {
    getBookings,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
};