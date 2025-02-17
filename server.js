const express = require('express');
const dotenv = require('dotenv');
const { pool } = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes'); // Auth routes
const taskRoutes = require('./routes/taskRoutes');  // Import task routes
const userRoutes = require('./routes/userRoutes'); // User management routes
const uploadRoutes = require('./routes/uploadRoutes'); // File upload routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);
app.use('/tasks', taskRoutes);  // Task management routes
// app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




