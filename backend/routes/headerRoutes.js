const express = require('express');
const Header = require('../models/Header');
const router = express.Router();

// Get the current header configuration
router.get("/", async (req, res) => {
  try {
    const header = await Header.findOne();
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }
    res.json(header);
  } catch (error) {
    console.error("Error fetching header:", error);
    res.status(500).json({ message: "Failed to fetch header data" });
  }
});



// Add a new header configuration
router.post('/add', async (req, res) => {
  try {
    const headerData = req.body;
    const newHeader = new Header(headerData);
    await newHeader.save();
    res.status(201).json(newHeader);
  } catch (error) {
    console.error('Error adding header:', error);
    res.status(500).json({ message: 'Failed to add header' });
  }
});

// Update an existing header configuration by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedHeader = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHeader) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.json(updatedHeader);
  } catch (error) {
    console.error('Error updating header:', error);
    res.status(500).json({ message: 'Failed to update header' });
  }
});

// Delete an existing header configuration by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedHeader = await Header.findByIdAndDelete(req.params.id);
    if (!deletedHeader) {
      return res.status(404).json({ message: 'Header not found' });
    }
    res.json({ message: 'Header deleted successfully' });
  } catch (error) {
    console.error('Error deleting header:', error);
    res.status(500).json({ message: 'Failed to delete header' });
  }
});

module.exports = router;
