const mongoose = require('mongoose');
const connectDB = require('./db');
const Web = require('./models/Web');
const seedSpiritualities = require('./seeders/seedSpiritualities');
const seedPeople = require('./seeders/seedPeople')
const seedSources = require('./seeders/seedSources')
const seedQuotes = require('./seeders/seedQuotes');
const resolveRelationships = require('./seeders/resolveRelationships')

const resetAndSeedDatabase = async () => {
  try {
    await connectDB();
    
    // Reset the database
    await mongoose.connection.dropDatabase();
    console.log('Database reset.');

    await Web.syncIndexes();
    console.log('Web indexes synced.');

    // Run seeders
    await seedSpiritualities();
    await seedPeople();
    await seedSources();
    await seedQuotes();

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error resetting and seeding database:', error);
    process.exit(1);
  }
};

resetAndSeedDatabase();
