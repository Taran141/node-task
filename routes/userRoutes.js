const express = require('express');
const { pool } = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// GET all users (Protected)
router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, email FROM users'); // Exclude password
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Database error', error });
    }
});

module.exports = router;
