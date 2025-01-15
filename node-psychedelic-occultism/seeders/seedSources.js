const mongoose = require('mongoose');
const Source = require('../models/Source');
const Spirituality = require('../models/Spirituality');
const sourceData = require('../data/sourceData');

async function seedSources() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    await Source.deleteMany({});

    const spiritualities = await Spirituality.find();

    for (const spirituality of spiritualities) {
      const spiritualityName = spirituality.name;
      const sources = sourceData[spiritualityName];

      if (sources && sources.length > 0) {
        const sourceDocs = sources.map((source) => ({
          title: source.title,
          type: source.type,
          image: source.image,
          description: source.description,
          publicationDate: source.publicationDate,
          tags: source.tags,
          relatedSystems: [spirituality._id], // Assign the ObjectId of the spirituality to relatedSystems
        }));

        const insertedSources = await Source.insertMany(sourceDocs);

        const sourceIds = insertedSources.map((source) => source._id);
        spirituality.sources = sourceIds; // This line works if 'sources' is part of the Spirituality schema
        await spirituality.save();
      }
    }

    await mongoose.disconnect();
    console.log('Sources seeding complete.');
  } catch (err) {
    console.error('Error seeding sources:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedSources();

module.exports = seedSources;
