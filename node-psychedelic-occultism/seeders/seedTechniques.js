const mongoose = require('mongoose');
const Technique = require('../models/Technique'); // Adjust path to your model

const seedData = [
  {
    name: 'meditation',
    description: 'Meditation is the practice of focusing the mind and achieving a state of relaxation or heightened awareness.'
  },
  {
    name: 'manifestation',
    description: 'Manifestation is the process of bringing desires and goals into reality through focused intention and belief.'
  },
  {
    name: 'tarot',
    description: 'Tarot is a divination technique that uses a deck of symbolic cards to gain insights and guidance.'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    console.log('Connected to MongoDB');

    // Clear existing data
    await Technique.deleteMany({});
    console.log('Cleared existing Techniques');

    // Insert seed data
    const createdTechniques = await Technique.insertMany(seedData);
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
