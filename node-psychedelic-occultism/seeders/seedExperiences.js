const Experience = require('../models/Experience'); // Adjust path to your model
const experienceData = require('../data/experienceData')

const seedExperiences = async () => {
  try {
    // Clear existing data
    await Experience.deleteMany({});
    console.log('Cleared existing Experiences');

    // Insert seed data
    const createdExperiences = await Experience.insertMany(experienceData);
    console.log(`Seeded ${createdExperiences.length} Experiences`);
  } catch (error) {
    console.error('Error seeding people:', error);
    throw error;
  }
}

module.exports = seedExperiences;
