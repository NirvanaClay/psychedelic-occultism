const mongoose = require('mongoose');
const Person = require('../models/Person'); // Adjust path to your Person model
const Spirituality = require('../models/Spirituality'); // Adjust path to your Spirituality model
const personData = require('../data/personData');

const seedPeople = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Person.deleteMany();
    console.log('Existing people data cleared');

    const updatedPeople = [];

    for (const person of personData) {
      const spiritualityIds = [];

      for (const slug of person.spiritualitySlug) {
        const spirituality = await Spirituality.findOne({ slug });
        if (!spirituality) {
          console.warn(`Warning: Spirituality not found for slug: ${slug}`);
          continue; // Skip this slug if not found
        }
        spiritualityIds.push(spirituality._id);
      }

      // Create a new person object with resolved spirituality IDs
      const newPerson = {
        ...person,
        spirituality: spiritualityIds, // Assign resolved spirituality references
        spiritualitySlug: undefined, // Remove the temporary attribute
      };

      updatedPeople.push(newPerson);
    }

    // Insert all updated people into the database
    await Person.insertMany(updatedPeople);
    console.log('Person data seeded successfully');

    // Disconnect from database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding people:', error);
  }
};

seedPeople();
