const mongoose = require('mongoose');
const Spirituality = require('../models/Spirituality');
const spiritualities = require('../data/spiritualityData');

console.log("Seeder script started1")

async function seedSpiritualities() {
  console.log("Seeder script started2")
  try {
    console.log("Seeder script started3")
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    console.log('Connected to MongoDB');

    await Spirituality.deleteMany({});
    console.log('Cleared existing Spirituality collection');

    await Spirituality.insertMany(spiritualities);
    console.log('Inserted spiritualities into the database');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding spiritualities:', err);

    await mongoose.disconnect();
    process.exit(1); 
  }
}

seedSpiritualities()

module.exports = seedSpiritualities;
