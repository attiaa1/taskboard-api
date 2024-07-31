require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

// connecting to database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// app configuration for middleware
app.use(express.json());

// routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// starting application on specified port
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));