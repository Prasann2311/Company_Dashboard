const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    console.log('🔍 Testing MySQL connection...');
    console.log('📊 Connection details:');
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Database: ${process.env.DB_NAME}`);
    
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 3306,
            database: process.env.DB_NAME
        });
        
        console.log('✅ MySQL Connected Successfully!');
        
        // Test query
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM companies');
        console.log(`📊 Total companies in database: ${rows[0].count}`);
        
        await connection.end();
        return true;
    } catch (error) {
        console.error('❌ MySQL Connection Failed!');
        console.error('Error:', error.message);
        
        if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('⚠️ Database does not exist! Create it first.');
        } else if (error.code === 'ECONNREFUSED') {
            console.error('⚠️ MySQL server is not running on port', process.env.DB_PORT || 3306);
        }
        return false;
    }
}

testConnection();