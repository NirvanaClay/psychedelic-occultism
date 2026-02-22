const mongoose = require('mongoose');
const Experience = require('../models/Experience'); // Adjust path to your model
const experienceData = require('../data/experienceData')

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    console.log('Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    console.log('Cleared existing Experiences');

    // Insert seed data
    const createdExperiences = await Experience.insertMany(experienceData);
    console.log(`Seeded ${createdExperiences.length} Experiences`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
