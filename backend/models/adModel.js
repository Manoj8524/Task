
const mongoose = require('mongoose');


const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'gif'], required: true },
  src: { type: String, required: true }, 
  size: { type: String, enum: ['large', 'small'], required: true },
  position: { type: String, enum: ['top-right', 'bottom-left', 'top-left'], required: true },
  isClosed: { type: Boolean, default: false }
});


module.exports = mongoose.model('Ad', adSchema);
