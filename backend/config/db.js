const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log('📡 Attempting database connection...');
console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
console.log(`   Database: ${process.env.DB_NAME}`);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Test connection immediately
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed!');
        console.error('Error:', err.message);
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('⚠️ Database "company_db" does not exist. Please create it.');
        } else if (err.code === 'ECONNREFUSED') {
            console.error('⚠️ MySQL server is not running or port is incorrect.');
        }
    } else {
        console.log('✅ Database connected successfully!');
        connection.release();
    }
});

module.exports = pool.promise();