const express = require('express');
const Footer = require('../models/Footer'); // Adjust the path as necessary
const router = express.Router();

// Get footer data
router.get('/footer', async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch footer data.' });
  }
});

// Create or update footer
router.post('/footer', async (req, res) => {
  try {
    const { content, contentColor, contentSize, backgroundColor, icons } = req.body;

    const footer = await Footer.findOneAndUpdate(
      {},
      { content, contentColor, contentSize, backgroundColor, icons },
      { upsert: true, new: true }
    );

    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update footer data.' });
  }
});

// Update footer by ID
router.put('/footer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, contentColor, contentSize, backgroundColor, icons } = req.body;

    const footer = await Footer.findByIdAndUpdate(
      id,
      { content, contentColor, contentSize, backgroundColor, icons },
      { new: true }
    );

    if (!footer) {
      return res.status(404).json({ error: 'Footer not found.' });
    }

    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update footer.' });
  }
});

// Add a new icon
router.post('/footer/icon', async (req, res) => {
  try {
    const { platform, url, color, size, image } = req.body;

    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found.' });
    }

    footer.icons.push({ platform, url, color, size, image });
    await footer.save();

    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add icon.' });
  }
});

// Update an existing icon
router.put('/footer/icon/:iconId', async (req, res) => {
  try {
    const { iconId } = req.params;
    const { platform, url, color, size, image } = req.body;

    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found.' });
    }

    const icon = footer.icons.id(iconId);
    if (!icon) {
      return res.status(404).json({ error: 'Icon not found.' });
    }

    Object.assign(icon, { platform, url, color, size, image });
    await footer.save();

    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update icon.' });
  }
});

// Delete an icon
router.delete('/footer/icon/:iconId', async (req, res) => {
  try {
    const { iconId } = req.params;

    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ error: 'Footer not found.' });
    }

    const icon = footer.icons.id(iconId);
    if (!icon) {
      return res.status(404).json({ error: 'Icon not found.' });
    }

    icon.remove();
    await footer.save();

    res.json(footer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete icon.' });
  }
});


module.exports = router;
