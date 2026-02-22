const express = require('express');
const router = express.Router();
const Technique = require('../models/Technique'); // Adjust path to your model

// Get all techniques
router.get('/all', async (req, res) => {
  try {
    const techniques = await Technique.find();
    res.json(techniques);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific technique by slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    const technique = isObjectId
      ? await Technique.findById(identifier) // Fetch by ID if it's a valid ObjectId
      : await Technique.findOne({ slug: identifier }); // Otherwise, fetch by slug

    if (!technique) return res.status(404).json({ error: "Technique not found" });

    res.json(technique);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Add a new technique
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTechnique = new Technique({ name, description });
    const savedTechnique = await newTechnique.save();
    res.status(201).json(savedTechnique);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create technique' });
  }
});

// Update an existing technique
router.put('/:slug', async (req, res) => {
  try {
    const { name, description } = req.body;

    // Find the technique by slug and update it
    const updatedTechnique = await Technique.findOneAndUpdate(
      { slug: req.params.slug },
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedTechnique) return res.status(404).json({ error: 'Technique not found' });
    res.json(updatedTechnique);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update technique' });
  }
});

// Delete a technique
router.delete('/:slug', async (req, res) => {
  try {
    const deletedTechnique = await Technique.findOneAndDelete({ slug: req.params.slug });
    if (!deletedTechnique) return res.status(404).json({ error: 'Technique not found' });
    res.json({ message: 'Technique deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
