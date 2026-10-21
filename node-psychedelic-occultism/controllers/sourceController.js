const express = require('express');
const router = express.Router();

const Source = require('../models/Source');
const Quote = require('../models/Quote');

// Get all sources
router.get('/all', async (req, res) => {
  try {
    const sources = await Source.find();
    res.json(sources);
  } catch (error) {
    console.error('Error fetching sources:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get quotes belonging to a source
router.get('/:id/quotes', async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);

    if (!source) {
      return res.status(404).json({ error: 'Source not found' });
    }

    const quotes = await Quote.find({
      source: source._id,
    })
      .populate('person', 'name slug')
      .populate('source', 'title slug');

    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes for source:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.get('/:id/quotes', async (req, res) => {
//   try {
//     const source = await Source.findById(req.params.id);

//     if (!source) {
//       return res.status(404).json({ error: 'Source not found' });
//     }

//     const quotes = await Quote.find({ source: source._id })
//       .populate('person', 'name slug');

//     res.json(quotes);
//   } catch (error) {
//     console.error('Error fetching source quotes:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Get a specific source by ID
router.get('/:id', async (req, res) => {
  try {
    const source = await Source.findById(req.params.id)
    .populate('people')
    .populate('spiritualities');

    if (!source) {
      return res.status(404).json({ error: 'Source not found' });
    }

    res.json(source);
  } catch (error) {
    console.error('Error fetching source:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new source
router.post('/', async (req, res) => {
  try {
    const newSource = new Source(req.body);
    const savedSource = await newSource.save();

    res.status(201).json(savedSource);
  } catch (error) {
    console.error('Error creating source:', error);
    res.status(400).json({ error: 'Failed to create source' });
  }
});

// Update an existing source
router.put('/:id', async (req, res) => {
  try {
    const updatedSource = await Source.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSource) {
      return res.status(404).json({ error: 'Source not found' });
    }

    res.json(updatedSource);
  } catch (error) {
    console.error('Error updating source:', error);
    res.status(400).json({ error: 'Failed to update source' });
  }
});

// Delete a source
router.delete('/:id', async (req, res) => {
  try {
    const deletedSource = await Source.findByIdAndDelete(req.params.id);

    if (!deletedSource) {
      return res.status(404).json({ error: 'Source not found' });
    }

    res.json({ message: 'Source deleted successfully' });
  } catch (error) {
    console.error('Error deleting source:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;