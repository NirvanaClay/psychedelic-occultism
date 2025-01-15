// seedQuotes.js
const mongoose = require('mongoose');
const Quote = require('../models/Quote');
const Spirituality = require('../models/Spirituality');
const quotesData = require('../data/quoteData');

async function seedQuotes() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    await Quote.deleteMany({});

    const spiritualities = await Spirituality.find();

    for (const spirituality of spiritualities) {
      const spiritualityName = spirituality.name;
      const quotes = quotesData[spiritualityName];

      if (quotes && quotes.length > 0) {
        const quoteDocs = quotes.map((text) => ({
          text,
          spirituality: spirituality._id,
        }));

        const insertedQuotes = await Quote.insertMany(quoteDocs);

        const quoteIds = insertedQuotes.map((quote) => quote._id);
        spirituality.significantQuotes = quoteIds;
        await spirituality.save();
      }
    }

    await mongoose.disconnect();
    console.log('Quotes seeding complete.');
  } catch (err) {
    console.error('Error seeding quotes:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedQuotes();

module.exports = seedQuotes;
