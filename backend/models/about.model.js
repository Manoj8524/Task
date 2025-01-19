const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  mission: { type: String, required: true },
  overview: { type: String, required: true },
  team: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      photo: { type: String, required: true },
    },
  ],
  values: { type: [String], required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model("About", AboutSchema);
