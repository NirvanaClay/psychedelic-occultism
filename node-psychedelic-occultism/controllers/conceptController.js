const express = require('express');
const router = express.Router();

const Concept = require('../models/Concept');
const protect = require('../middleware/authMiddleware');


// Get all concepts
router.get('/all', async (req, res) => {
  try {
    const concepts = await Concept.find()
      .populate('createdBy', 'username');

    res.json(concepts);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get a specific concept by slug
router.get('/:slug', async (req, res) => {
  try {
    const concept = await Concept.findOne({
      slug: req.params.slug,
    })
      .populate('createdBy', 'username');

    if (!concept) {
      return res.status(404).json({
        error: 'Concept not found',
      });
    }

    res.json(concept);
  } catch (error) {
    console.error('Error fetching concept:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Create a concept
router.post('/', protect, async (req, res) => {
  try {
    const { name, summary } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Concept name is required',
      });
    }

    const newConcept = new Concept({
      name,
      summary,
      createdBy: req.user.userId,
    });

    const savedConcept = await newConcept.save();

    res.status(201).json(savedConcept);
  } catch (error) {
    console.error('Error creating concept:', error);

    res.status(400).json({
      error: 'Failed to create concept',
    });
  }
});


// Update a concept
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, summary } = req.body;

    const concept = await Concept.findById(req.params.id);

    if (!concept) {
      return res.status(404).json({
        error: 'Concept not found',
      });
    }

    // Only the user who created the concept can edit it.
    if (concept.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        error: 'Not authorized to edit this concept',
      });
    }

    if (name !== undefined) {
      concept.name = name;
    }

    if (summary !== undefined) {
      concept.summary = summary;
    }

    await concept.save();

    res.json(concept);
  } catch (error) {
    console.error('Error updating concept:', error);

    res.status(400).json({
      error: 'Failed to update concept',
    });
  }
});


// Delete a concept
router.delete('/:id', protect, async (req, res) => {
  try {
    const concept = await Concept.findById(req.params.id);

    if (!concept) {
      return res.status(404).json({
        error: 'Concept not found',
      });
    }

    // Only the user who created the concept can delete it.
    if (concept.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        error: 'Not authorized to delete this concept',
      });
    }

    await concept.deleteOne();

    res.json({
      message: 'Concept deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting concept:', error);

    res.status(500).json({
      error: 'Server error',
    });
  }
});


module.exports = router;