const express = require('express');
const router = express.Router();
const Header = require('../models/Header');


router.get('/', async (req, res) => {
  try {
    const header = await Header.findOne();
    res.json(header || { message: "No header configuration found" });
  } catch (error) {
    console.error("Error fetching header:", error);
    res.status(500).json({ message: "Failed to fetch header data" });
  }
});


router.post('/add', async (req, res) => {
  try {
    const newHeader = new Header(req.body);
    await newHeader.save();
    res.status(201).json(newHeader);
  } catch (error) {
    console.error("Error adding header:", error);
    res.status(500).json({ message: "Failed to add header" });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedHeader = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedHeader);
  } catch (error) {
    console.error("Error updating header:", error);
    res.status(500).json({ message: "Failed to update header" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Header.findByIdAndDelete(req.params.id);
    res.json({ message: "Header deleted successfully" });
  } catch (error) {
    console.error("Error deleting header:", error);
    res.status(500).json({ message: "Failed to delete header" });
  }
});

module.exports = router;
