const express = require('express');
const router = express.Router();
const Source = require('../models/Source'); // Adjust path to your model

// Get all sources
router.get('/all', async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific source by ID
router.get('/:id', async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    if (!source) return res.status(404).json({ error: 'Source not found' });
    res.json(source);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new source
router.post('/', async (req, res) => {
  try {
    const { title, author, description, tags } = req.body;
    const newSource = new Source({ title, author, description, tags });
    const savedSource = await newSource.save();
    res.status(201).json(savedSource);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create source' });
  }
});

// Update an existing source
router.put('/:id', async (req, res) => {
  try {
    const { title, author, description, tags } = req.body;
    const updatedSource = await Source.findByIdAndUpdate(
      req.params.id,
      { title, author, description, tags },
      { new: true, runValidators: true }
    );
    if (!updatedSource) return res.status(404).json({ error: 'Source not found' });
    res.json(updatedSource);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update source' });
  }
});

// Delete a source
router.delete('/:id', async (req, res) => {
  try {
    const deletedSource = await Source.findByIdAndDelete(req.params.id);
    if (!deletedSource) return res.status(404).json({ error: 'Source not found' });
    res.json({ message: 'Source deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
