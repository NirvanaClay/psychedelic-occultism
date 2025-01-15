const mongoose = require('mongoose');
const connectDB = require('./db');
const seedSpiritualities = require('./seeders/seedSpiritualities');
const seedQuotes = require('./seeders/seedQuotes');

const resetAndSeedDatabase = async () => {
  try {
    await connectDB();
    
    // Reset the database
    await mongoose.connection.dropDatabase();
    console.log('Database reset.');

    // Run seeders
    await seedSpiritualities();
    await seedQuotes();

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Error resetting and seeding database:', error);
    process.exit(1);
  }
};

resetAndSeedDatabase();
