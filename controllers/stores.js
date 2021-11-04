// Require Dependencies
const express = require('express');
const Store = require('../models/store');
// Create Router Object
const router = express.Router();

//Define Route / Controllers

// Index Route
router.get('/', async (req, res) => {
  try {
      res.json(await Store.find({managedBy: req.user.uid}));
  } catch (error) {
    res.status(401).json({message: 'Please login to see contacts'});
  }
});

// Delete Route
router.delete()
