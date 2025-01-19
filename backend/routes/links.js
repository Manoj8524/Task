const express = require('express');
const Link = require('../models/Link');
const router = express.Router();

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching links' });
  }
});

// Create a new link
router.post('/', async (req, res) => {
  const { name, url, icon, textColor, textSize, backgroundColor, width } = req.body;

  try {
    const newLink = new Link({
      name,
      url,
      icon,
      textColor,
      textSize,
      backgroundColor,
      width,
    });

    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (err) {
    res.status(500).json({ message: 'Error saving the link' });
  }
});

// Update a link
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLink = await Link.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLink);
  } catch (err) {
    res.status(500).json({ message: 'Error updating the link' });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Link.findByIdAndDelete(id);
    res.json({ message: 'Link deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the link' });
  }
});

module.exports = router;
