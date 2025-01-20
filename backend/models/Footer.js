const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  platform: { type: String, required: true }, 
  url: { type: String, required: true },      
  color: { type: String, required: true },    
  size: { type: String, required: true },    
  image: { type: String, required: false },   
});

const footerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  contentColor: { type: String, required: true },
  contentSize: { type: String, required: true },
  backgroundColor: { type: String, required: true },
  icons: [iconSchema], 
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
