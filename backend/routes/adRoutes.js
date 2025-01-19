// /routes/adRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Ad = require('../models/adModel');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save the file with a unique name
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit the file size to 10 MB
  fileFilter: (req, file, cb) => {
    // Accept only specific file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only image and video files are allowed.'));
    }
    cb(null, true);
  }
});

// POST a new ad (with file upload)
router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const { title, description, type, size, position } = req.body;

  const newAd = new Ad({
    title,
    description,
    type,
    src: req.file.path, // Store the file path
    size,
    position
  });

  try {
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(500).json({ message: 'Error creating ad', error: err });
  }
});

// GET all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ads', error: err });
  }
});

// PUT (update) an existing ad
router.put('/:id', upload.single('file'), async (req, res) => {
  const { id } = req.params;
  let updateData = req.body;

  if (req.file) {
    updateData.src = req.file.path; // If a new file is uploaded, update the file path
  }

  try {
    const updatedAd = await Ad.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAd) return res.status(404).send('Ad not found');
    res.json(updatedAd);
  } catch (err) {
    res.status(500).json({ message: 'Error updating ad', error: err });
  }
});

// DELETE an ad
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAd = await Ad.findByIdAndDelete(id);
    if (!deletedAd) return res.status(404).send('Ad not found');
    res.status(200).send('Ad deleted');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting ad', error: err });
  }
});

module.exports = router;
