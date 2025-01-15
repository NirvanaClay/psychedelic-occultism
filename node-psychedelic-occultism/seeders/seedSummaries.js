const mongoose = require('mongoose');
const Summary = require('../models/Summary');
const Spirituality = require('../models/Spirituality');
const summaryData = require('../data/summaryData');

async function seedSummaries() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/psychedelic-occultism');

    await Summary.deleteMany({});

    const spiritualities = await Spirituality.find();

    for (const spirituality of spiritualities) {
      const spiritualityName = spirituality.name;
      const summaries = summaryData[spiritualityName];

      if (summaries && summaries.length > 0) {
        const summaryDocs = summaries.map((summary) => ({
          title: summary.title,
          content: summary.content,
          spirituality: spirituality._id,
        }));

        const insertedSummaries = await Summary.insertMany(summaryDocs);

        const summaryIds = insertedSummaries.map((summary) => summary._id);
        spirituality.summaries = summaryIds;
        await spirituality.save();
      }
    }

    await mongoose.disconnect();
    console.log('Summaries seeding complete.');
  } catch (err) {
    console.error('Error seeding summaries:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedSummaries();

module.exports = seedSummaries;
