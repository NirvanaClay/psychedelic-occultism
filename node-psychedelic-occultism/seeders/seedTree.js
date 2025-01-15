const mongoose = require('mongoose');
const TreeElement = require('../models/TreeElement'); // Adjust path to your model

const seedData = [
  { name: 'kether', translation: 'Crown' },
  { name: 'chokmah', translation: 'Wisdom' },
  { name: 'binah', translation: 'Understanding' },
  { name: 'chesed', translation: 'Kindness' },
  { name: 'geburah', translation: 'Strength' },
  { name: 'tiphareth', translation: 'Beauty' },
  { name: 'netzach', translation: 'Victory' },
  { name: 'hod', translation: 'Splendor' },
  { name: 'yesod', translation: 'Foundation' },
  { name: 'malkuth', translation: 'Kingdom' },
  { name: 'aleph' },
  { name: 'bet' },
  { name: 'gimmel' },
  { name: 'daleth' },
  { name: 'heh' },
  { name: 'vav' },
  { name: 'zayin' },
  { name: 'chet' },
  { name: 'tet' },
  { name: 'yod' },
  { name: 'kaph' },
  { name: 'lamed' },
  { name: 'mem' },
  { name: 'nun' },
  { name: 'samekh' },
  { name: 'ayin' },
  { name: 'peh' },
  { name: 'tzadi' },
  { name: 'quf' },
  { name: 'resh' },
  { name: 'shin' },
  { name: 'tav' }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    console.log('Connected to MongoDB');

    // Clear existing data
    await TreeElement.deleteMany({});
    console.log('Cleared existing TreeElements');

    // Insert seed data
    const createdElements = await TreeElement.insertMany(seedData);
    console.log(`Seeded ${createdElements.length} TreeElements`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();
