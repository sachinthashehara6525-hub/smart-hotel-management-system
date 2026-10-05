const db = require("../config/db");

const getDashboardSummary = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                (
                    SELECT COUNT(*)
                    FROM rooms
                ) AS totalRooms,
                (
                    SELECT COUNT(*)
                    FROM rooms
                    WHERE status = 'Available'
                ) AS availableRooms,
                (
                    SELECT COUNT(*)
                    FROM bookings
                ) AS totalBookings,
                (
                    SELECT COUNT(*)
                    FROM customers
                ) AS totalCustomers,
                (
                    SELECT COUNT(*)
                    FROM rooms
                    WHERE status = 'Occupied'
                ) AS occupiedRooms,
                (
                    SELECT COUNT(*)
                    FROM bookings
                    WHERE status = 'Confirmed'
                    AND check_in_date = CURDATE()
                ) AS pendingCheckIns,
                (
                    SELECT COUNT(*)
                    FROM bookings
                    WHERE status = 'Checked-in'
                    AND check_out_date = CURDATE()
                ) AS pendingCheckOuts
        `);

        const summary = rows[0];
        const totalRooms = Number(summary.totalRooms);
        const occupiedRooms = Number(summary.occupiedRooms);

        res.json({
            totalRooms,
            availableRooms: Number(summary.availableRooms),
            totalBookings: Number(summary.totalBookings),
            totalCustomers: Number(summary.totalCustomers),
            occupancyRate: totalRooms === 0
                ? 0
                : Math.round((occupiedRooms / totalRooms) * 100),
            pendingCheckIns: Number(summary.pendingCheckIns),
            pendingCheckOuts: Number(summary.pendingCheckOuts)
        });
    } catch (error) {
        console.error("Get dashboard summary error:", error);

        res.status(500).json({
            message: "Failed to retrieve dashboard summary"
        });
    }
};

module.exports = {
    getDashboardSummary
};
