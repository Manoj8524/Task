const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema({
  text: { type: String, default: "Default Header Text" },
  textColor: { type: String, default: "#000" },
  textSize: { type: String, default: "24px" },
  backgroundColor: { type: String, default: "#fff" },
  height: { type: String, default: "60px" },
  logo: {
    imageUrl: { type: String },
    size: { type: String, default: "40px" },
    borderRadius: { type: String, default: "50%" },
  },
});

module.exports = mongoose.model("Header", headerSchema);
