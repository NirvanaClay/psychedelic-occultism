const Technique = require('../models/Technique');
const techniqueData = require('../data/techniqueData')

const seedTechniques = async () => {
  try {
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
    throw error
  }
};

module.exports = seedTechniques;
