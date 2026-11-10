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

const deleteCustomer = async (req, res) => {
    try {
        const customerId = Number(req.params.id);

        if (!Number.isInteger(customerId) || customerId <= 0) {
            return res.status(400).json({
                message: "Invalid customer ID"
            });
        }

        const [result] = await db.query(
            "DELETE FROM customers WHERE customer_id = ?",
            [customerId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.json({
            message: "Customer deleted successfully"
        });
    } catch (error) {
        console.error("Delete customer error:", error);

        res.status(500).json({
            message: "Failed to delete customer"
        });
    }
};

module.exports = {
    getCustomers,
    deleteCustomer
};
