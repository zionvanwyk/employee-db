const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your Vue.js frontend

// Routes
app.use('/api', employeeRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Employee Hierarchy Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
