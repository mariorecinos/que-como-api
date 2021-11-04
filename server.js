// Require Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { application } = require('express');

// Initialize Expres App
const app = express();

// Configure Settings
require('dotenv').config();
const {
  DATABASE_URL,
  PORT=3001
} = process.env

// Configure Connectionj to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
db.on('error', (error) => console.log('MongoDB has an error ' + error.message));

// Mount Middleware

// Authorization Middleware

// Tell The App To Listen
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
