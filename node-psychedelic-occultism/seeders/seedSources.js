const mongoose = require('mongoose');
const Source = require('../models/Source'); // Update with the correct path to your Source model
const Person = require('../models/Person'); // Ensure this is the correct path to your Person model
const sourceData = require('../data/sourceData');

const seedSources = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');
    console.log('Connected to the database.');

    // Clear existing sources
    await Source.deleteMany({});
    console.log('Existing sources cleared.');

    // Insert new source data
    const insertedSources = [];

    for (const source of sourceData) {
      // Find the corresponding person by slug
      const person = await Person.findOne({ slug: source.personSlug });
      if (!person) {
        console.warn(`Person not found for slug: ${source.personSlug}`);
        continue; // Skip this source if the person is not found
      }

      // Create the source with the resolved person ID
      const newSource = await Source.create({
        ...source,
        person: person._id, // Assign the ObjectId of the person
      });

      insertedSources.push(newSource);
    }

    console.log(`${insertedSources.length} sources seeded successfully.`);

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding sources:', error);
    process.exit(1); // Exit with failure
  }
};

// Run the seed function
seedSources();

module.exports = seedSources;
