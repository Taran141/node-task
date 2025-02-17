// const express = require('express');
// const { Pool } = require('pg');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const app = express();
// const PORT = process.env.PORT || 5001;

// dotenv.config();
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// app.use(express.json()); // Middleware to parse JSON

// // Middleware to verify JWT
// function verifyToken(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(403).json({ message: 'Access denied' });
//     try {
//         const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// }

// // REGISTER route
// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//         const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
//         res.status(201).json({ message: 'User registered', user: result.rows[0] });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering user', error });
//     }
// });

// // LOGIN route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         if (result.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });
        
//         const user = result.rows[0];
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
        
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Login error', error });
//     }
// });

// // GET /users → Protected route
// app.get('/users', verifyToken, async (req, res) => {
//     try {
//         const result = await pool.query('SELECT id, name, email FROM users'); // Exclude password
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Database error', error });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
