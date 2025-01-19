const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g., 'facebook-f', 'custom'
  url: { type: String, required: true },      // Icon link
  color: { type: String, required: true },    // Icon color, e.g., #ffffff
  size: { type: String, required: true },     // Font size, e.g., '24px'
  image: { type: String, required: false },   // Optional custom image URL
});

const footerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  contentColor: { type: String, required: true },
  contentSize: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  icons: [iconSchema], // Array of icons
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
