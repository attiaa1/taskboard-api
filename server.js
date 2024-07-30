require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// connecting to database
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// app configuration for middleware: in this case JSON

app.use(bodyParser.json())

// routes

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

// starting application on specified port
app.listen(6000, () => console.log('Server started on port 6000...'))
