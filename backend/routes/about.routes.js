const express = require("express");
const router = express.Router();
const About = require("../models/about.model");

// **GET**: Fetch About Page Data
router.get("/", async (req, res) => {
  try {
    const aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: "About page content not found" });
    }
    res.status(200).json(aboutData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about data", error });
  }
});

// **POST**: Create New About Page Data
router.post("/", async (req, res) => {
  const { mission, overview, team, values, contact } = req.body;

  try {
    const newAboutData = new About({ mission, overview, team, values, contact });
    const savedData = await newAboutData.save();
    res.status(201).json({ message: "About data created successfully", savedData });
  } catch (error) {
    res.status(500).json({ message: "Error creating about data", error });
  }
});

// **PUT**: Update About Page Data
router.put("/", async (req, res) => {
  const { mission, overview, team, values, contact } = req.body;

  try {
    let aboutData = await About.findOne();
    if (!aboutData) {
      return res.status(404).json({ message: "About page content not found" });
    }

    aboutData.mission = mission;
    aboutData.overview = overview;
    aboutData.team = team;
    aboutData.values = values;
    aboutData.contact = contact;

    const updatedData = await aboutData.save();
    res.status(200).json({ message: "About data updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ message: "Error updating about data", error });
  }
});

// **DELETE**: Delete About Page Data
router.delete("/", async (req, res) => {
  try {
    const deletedData = await About.deleteOne();
    if (deletedData.deletedCount === 0) {
      return res.status(404).json({ message: "About page content not found" });
    }
    res.status(200).json({ message: "About data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting about data", error });
  }
});

module.exports = router;
