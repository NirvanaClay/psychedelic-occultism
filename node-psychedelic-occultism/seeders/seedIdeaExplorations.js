const mongoose = require('mongoose');
const IdeaExploration = require('../models/IdeaExploration');
const Spirituality = require('../models/Spirituality');
const ideaExplorationData = require('../data/ideaExplorationData');

async function seedIdeaExplorations() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    await IdeaExploration.deleteMany({});

    const spiritualities = await Spirituality.find();

    for (const spirituality of spiritualities) {
      const spiritualityName = spirituality.name;
      const ideaExplorations = ideaExplorationData[spiritualityName];

      if (ideaExplorations && ideaExplorations.length > 0) {
        const ideaDocs = ideaExplorations.map((idea) => ({
          title: idea.title, // Use the title from the idea object
          content: idea.content, // Use the content from the idea object
          spirituality: spirituality._id, // Assign the ObjectId
        }));

        const insertedIdeas = await IdeaExploration.insertMany(ideaDocs);

        const ideaIds = insertedIdeas.map((idea) => idea._id);
        spirituality.ideaExplorations = ideaIds;
        await spirituality.save();
      }
    }

    await mongoose.disconnect();
    console.log('Idea explorations seeding complete.');
  } catch (err) {
    console.error('Error seeding idea explorations:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedIdeaExplorations();

module.exports = seedIdeaExplorations;
