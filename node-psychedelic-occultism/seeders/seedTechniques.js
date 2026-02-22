const mongoose = require('mongoose');
const Technique = require('../models/Technique');
const techniqueData = require('../data/techniqueData')

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    console.log('Connected to MongoDB');

    // Clear existing data
    await Technique.deleteMany({});
    console.log('Cleared existing Techniques');

    // Insert seed data
    const createdTechniques = await Technique.insertMany(techniqueData);
    console.log(`Seeded ${createdTechniques.length} Techniques`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
