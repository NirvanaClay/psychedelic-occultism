const express = require('express');
const router = express.Router();
const TreeElement = require('../models/TreeElement');

// Get all tree elements
router.get('/', async (req, res) => {
  try {
    const elements = await TreeElement.find().populate('connections');
    res.json(elements);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single tree element by ID
router.get('/:name', async (req, res) => {
  try {
    const element = await TreeElement.findOne({ name: req.params.name });
    if (!element) return res.status(404).json({ error: 'TreeElement not found' });
    res.json(element);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new tree element
router.post('/', async (req, res) => {
  try {
    const { name, description, symbol, connections } = req.body;
    const newElement = new TreeElement({ name, description, symbol, connections });
    const savedElement = await newElement.save();
    res.status(201).json(savedElement);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create TreeElement' });
  }
});

// Update a tree element
router.put('/:id', async (req, res) => {
  try {
    const { name, description, symbol, connections } = req.body;
    const updatedElement = await TreeElement.findByIdAndUpdate(
      req.params.id,
      { name, description, symbol, connections },
      { new: true }
    );
    if (!updatedElement) return res.status(404).json({ error: 'TreeElement not found' });
    res.json(updatedElement);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update TreeElement' });
  }
});

// Delete a tree element
router.delete('/:id', async (req, res) => {
  try {
    const deletedElement = await TreeElement.findByIdAndDelete(req.params.id);
    if (!deletedElement) return res.status(404).json({ error: 'TreeElement not found' });
    res.json({ message: 'TreeElement deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
