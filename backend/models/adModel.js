// /models/adModel.js
const mongoose = require('mongoose');

// Define Advertisement schema
const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'gif'], required: true },
  src: { type: String, required: true }, // The file path will be stored here
  size: { type: String, enum: ['large', 'small'], required: true },
  position: { type: String, enum: ['top-right', 'bottom-left', 'top-left'], required: true },
  isClosed: { type: Boolean, default: false }
});

// Create and export the Advertisement model
module.exports = mongoose.model('Ad', adSchema);
