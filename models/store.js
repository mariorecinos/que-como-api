// Require Dependencies
const mongoose = require('mongoose');
// Create Schema Shortcut Variable
const Schema = mongoose.Schema;
//Define Schema

const reviewSchema = new Schema({
    content: String,
    createdBy: String
}, {timestamps: true });

const storeSchema = new Schema({
    name: String,
    category: String,
    image: String,
    saved: {
      type: Boolean,
      default: false
    },
    managedBy: String, // Google Firebase User ID
    review: [reviewSchema]
}, { timestamps: true });

// Export the result of compiling the Schema into a model
module.exports = mongoose.model('Store', storeSchema);
