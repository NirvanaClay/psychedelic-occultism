const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // Update path as necessary
const Source = require('../models/Source');
const Quote = require('../models/Quote');

// Get all persons
router.get('/all', async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific person by ID
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    const person = isObjectId
      ? await Person.findById(identifier) // Fetch by ID if it's a valid ObjectId
      : await Person.findOne({ slug: identifier }); // Otherwise, fetch by slug

    if (!person) return res.status(404).json({ error: "Person not found" });

    res.json(person);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Add a new person
router.post('/', async (req, res) => {
  try {
    const { name, image, bio } = req.body;
    const newPerson = new Person({ name, image, bio });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create person' });
  }
});

// Update an existing person
router.put('/:id', async (req, res) => {
  try {
    const { name, image, bio } = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      { name, image, bio },
      { new: true, runValidators: true }
    );
    if (!updatedPerson) return res.status(404).json({ error: 'Person not found' });
    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update person' });
  }
});

router.get('/:slug/quotes', async (req, res) => {
  const person = await Person.findOne({ slug: req.params.slug });
  if (!person) return res.status(404).json({ error: 'Person not found' });
  const quotes = await Quote.find({ person: person._id });
  res.json(quotes);
});

router.get('/:slug/sources', async (req, res) => {
  const person = await Person.findOne({ slug: req.params.slug });
  if (!person) return res.status(404).json({ error: 'Person not found' });
  const sources = await Source.find({ person: person._id });
  res.json(sources);
});

// Delete a person
router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) return res.status(404).json({ error: 'Person not found' });
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
