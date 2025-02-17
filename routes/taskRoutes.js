const express = require('express');
const { pool } = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Create a task
router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [req.user.id, title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// Get all tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, status } = req.body;
    try {
        await pool.query(
            'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 AND user_id = $5',
            [title, description, status, req.params.id, req.user.id]
        );
        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

module.exports = router;
