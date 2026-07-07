const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/companyRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', companyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Test database endpoint
app.get('/test-db', async (req, res) => {
    try {
        const [result] = await db.query('SELECT COUNT(*) as count FROM companies');
        res.json({ 
            success: true, 
            message: 'Database connected!',
            companyCount: result[0].count
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
    console.log(`🔍 Test DB: http://localhost:${PORT}/test-db`);
    console.log(`💚 Health: http://localhost:${PORT}/health`);
});