const mongoose = require('mongoose');

// Define the schema for content
const ContentSchema = new mongoose.Schema({
  features: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      imageRadius: { type: String, default: 'md' },
      textSize: { type: String, default: 'base' },
      textColor: { type: String, default: 'gray-800' },
    },
  ],
  gallery: [
    {
      url: { type: String, required: true },
      radius: { type: String, default: 'md' },
    },
  ],
});

// Export the model
module.exports = mongoose.model('Content', ContentSchema);
