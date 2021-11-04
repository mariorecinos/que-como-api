// Require Dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const storesController = require('./controllers/stores');
const admin = require('firebase-admin');


// Initialize Expres App
const app = express();

// Configure Settings
require('dotenv').config();
const {
  PORT,
  CLIENT_ID,
  PRIVATE_KEY,
  DATABASE_URL,
  PRIVATE_KEY_ID, } = process.env

// Configure Connectionj to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
db.on('error', (error) => console.log('MongoDB has an error ' + error.message));

// Mount Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Authorization Middleware

admin.initalizeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "que-como-a4442",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-iabtc@que-como-a4442.iam.gserviceaccount.com",
    "client_id": CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iabtc%40que-como-a4442.iam.gserviceaccount.com"
  })

});

// authenticate user function
app.use(async function(req, res, next) {
  const token = req.get('Authorization');

  if(token) {
    const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
    req.user = authUser;
  }

  next();

});

// router auth middleware function
function isAuthenticated(req, res, next) {
  if(req.user) return next();
  else res.status(401).json({message: 'unauthorized'});
}

// Mount Routes
app.get('/api', (req, res) => {
  res.json({message: 'Bienvenido a Que Como!'})
});

//Use Controllers
app.use('/api/stores', isAuthenticated, storesController);

// Catch All Route - for catching request for routes that are not found
app.get('/api/*', (req, res) => {
  res.status(404).json({message: 'That route was not found'})
});

// Tell The App To Listen
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
