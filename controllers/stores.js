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
    res.status(401).json({message: 'Please login to see stores'});
  }
});

// Delete Route
router.delete('/store/:id', async (req, res) => {
    try {
      res.json(await Store.findByIdAndDelete(req.params.id));
    } catch (error) {
      res.status(401).json({message: 'Sorry Something Went Wrong'})
    }
});

// Update Route
router.put('/store/:id', async (req, res) => {
  try {
      res.json(await Store.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true })
      );
  } catch (error) {
    res.status(401).json({message: 'Sorry Something Went Wrong Updating Store'})
  }
});

// Create Route
router.post('/', async (req, res) => {
  try {
      res.json(await Store.create(req.body));
  } catch (error) {
    res.status(401).json({message: 'Please Login To Create a Store'});
  }
});

// Create Review Route
router.post('/:id/review', async (req, res) => {
  try {
      const store = await Store.findById(req.params.id);
      store.review.push(req.body); // pushes the data into the notes array in memory only
      await store.save(); // we call save to persist the changes in MongoDB
      res.json(store);
  } catch (error) {
    res.status(401).json({message: 'Sorry Something Went Wrong'});
  }
});

// Export The Router Object
module.exports = router;
