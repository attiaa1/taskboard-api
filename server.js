require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middleware/authMiddleware')

// connecting to database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// app configuration for middleware
app.use(express.json());

// routes
app.use('/auth', authRoutes)
app.use('/tasks', authMiddleware, taskRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// starting application on specified port
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));