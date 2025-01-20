const express = require('express');
const router = express.Router();
const Content = require('../models/HomeContent');

router.get('/', async (req, res) => {
  try {
    const content = await Content.findOne();
    res.json(content || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});


router.post('/', async (req, res) => {
  try {
    const existingContent = await Content.findOne();
    if (existingContent) {
     
      Object.assign(existingContent, req.body);
      await existingContent.save();
      res.status(200).json({ message: 'Content updated successfully' });
    } else {
      
      const newContent = new Content(req.body);
      await newContent.save();
      res.status(201).json({ message: 'Content created successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

module.exports = router;
