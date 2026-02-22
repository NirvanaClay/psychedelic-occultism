const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience'); // Update path as necessary

// Get all experiences
router.get('/all', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new experience
router.post('/', async (req, res) => {
  try {
    const { title, content, category, tags, privacy } = req.body;

    const newExperience = new Experience({
      title,
      content,
      category,
      tags,
      privacy,
    });

    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create experience' });
  }
});


// Update an existing experience
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (!updatedExperience) return res.status(404).json({ error: 'Experience not found' });
    res.json(updatedExperience);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update experience' });
  }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) return res.status(404).json({ error: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
