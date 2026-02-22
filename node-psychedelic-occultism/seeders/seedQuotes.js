const mongoose = require('mongoose');
const Quote = require('../models/Quote'); // Adjust path to your Quote model
const Source = require('../models/Source'); // Adjust path to your Source model
const Person = require('../models/Person'); // Adjust path to your Person model
const Spirituality = require('../models/Spirituality'); // Adjust path to your Spirituality model
const quoteData = require('../data/quoteData'); // Adjust path to your quote data file

const seedQuotes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');
    console.log('Connected to MongoDB');

    // Clear existing quotes
    await Quote.deleteMany();
    console.log('Existing quotes deleted');

    // Process and insert quotes
    for (const quote of quoteData) {
      // Find the referenced person by slug
      const person = await Person.findOne({ slug: quote.personSlug });
      if (!person) {
        console.error(`Person with slug "${quote.personSlug}" not found. Skipping quote.`);
        continue;
      }

      // Find the referenced source by slug
      const source = await Source.findOne({ slug: quote.sourceSlug });
      if (!source) {
        console.error(`Source with slug "${quote.sourceSlug}" not found. Skipping quote.`);
        continue;
      }

      // Find the referenced spirituality by slug(s)
      let spirituality = [];
      if (quote.spiritualitySlug) {
        spirituality = await Promise.all(
          quote.spiritualitySlug.map(async (slug) => {
            const spiritualItem = await Spirituality.findOne({ slug });
            if (!spiritualItem) {
              console.warn(`Spirituality with slug "${slug}" not found.`);
              return null;
            }
            return spiritualItem._id;
          })
        );
        // Filter out any null values if some slugs didn't match
        spirituality = spirituality.filter((id) => id !== null);
      }

      // Create the quote with references
      const newQuote = new Quote({
        text: quote.text,
        person: person._id, // Resolved Person ID
        source: source._id, // Resolved Source ID
        spirituality: spirituality, // Resolved Spirituality IDs
        likes: quote.likes || 0,
        likedBy: quote.likedBy || [],
      });

      await newQuote.save();
      console.log(`Quote saved: "${quote.text}"`);
    }

    console.log('Quotes seeding completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding quotes:', error);
    mongoose.connection.close();
  }
};

// Call the seeder function
seedQuotes();
