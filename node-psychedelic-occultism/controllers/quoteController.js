const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

router.get('/all', async (req, res) => {
  const { person, spirituality } = req.query;
  const filter = {};
  if (person) {
    const personObj = await Person.findOne({ slug: person });
    if (personObj) filter.person = personObj._id;
  }
  if (spirituality) filter.spirituality = spirituality;

  const quotes = await Quote.find(filter);
  res.json(quotes);
});

// Get a single quote by ID
router.get('/:id', async (req, res) => {
  const quote = await Quote.findById(req.params.id).populate('person spirituality source');
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  res.json(quote);
});

module.exports = router;