const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// POST a new service
router.post("/", async (req, res) => {
    try {
      const services = Array.isArray(req.body) ? req.body : [req.body];
      const newServices = await Service.insertMany(services);
      res.status(201).json(newServices);
    } catch (error) {
      res.status(400).json({ error: "Failed to add services" });
    }
  });
  

// PUT (update) a service by ID
router.put("/:id", async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ error: "Failed to update service" });
  }
});

// DELETE a service by ID
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});

module.exports = router;
