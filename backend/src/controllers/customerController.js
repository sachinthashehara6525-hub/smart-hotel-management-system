const db = require("../config/db");

const getCustomers = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                customer_id AS id,
                name,
                email,
                phone
            FROM customers
            ORDER BY customer_id
        `);

        res.json(rows);
    } catch (error) {
        console.error("Get customers error:", error);

        res.status(500).json({
            message: "Failed to retrieve customers"
        });
    }
};

module.exports = {
    getCustomers
};
