const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "smart_hotel",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true
});

const initializeAuthSchema = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS sessions (
            session_id BIGINT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            token_hash CHAR(64) NOT NULL,
            expires_at DATETIME NOT NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (session_id),
            UNIQUE KEY token_hash (token_hash),
            KEY sessions_user_id_idx (user_id),
            KEY sessions_expires_at_idx (expires_at),
            CONSTRAINT sessions_user_fk FOREIGN KEY (user_id)
                REFERENCES users (user_id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
};

module.exports = pool;
module.exports.initializeAuthSchema = initializeAuthSchema;