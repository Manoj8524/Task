const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
  textColor: { type: String, default: "text-gray-300" },
  textSize: { type: String, default: "text-base" },
  backgroundColor: { type: String, default: "bg-gray-800" },
  width: { type: String, default: "w-45" },
});

module.exports = mongoose.model('Link', linkSchema);
