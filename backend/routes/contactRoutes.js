const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST a new contact message
router.post("/", async (req, res) => {
  const { name, email, subject, message, phone, address } = req.body;

  try {
    const newMessage = new Contact({ 
      name, 
      email, 
      subject, 
      message, 
      phone: phone || "", // Set default value if phone is not provided
      address: address || "" // Set default value if address is not provided
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: "Failed to send message" });
  }
});

// DELETE a contact message by ID
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
});

module.exports = router;
