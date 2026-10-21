const Spirituality = require('../models/Spirituality');
const spiritualityData = require('../data/spiritualityData');

async function seedSpiritualities() {
  try {
    await Spirituality.deleteMany({});
    console.log('Cleared existing Spirituality collection');

    await Spirituality.insertMany(spiritualityData);

    console.log('Inserted spiritualities into the database');
  } catch (err) {
    console.error('Error seeding spiritualities:', err);
    throw err;
  }
}

module.exports = seedSpiritualities;

// const mongoose = require('mongoose');
// const Spirituality = require('../models/Spirituality');
// const Source = require('../models/Source');
// const spiritualityData = require('../data/spiritualityData');

// console.log("Seeder script started1")

// async function seedSpiritualities() {
//   try {
//     await Spirituality.deleteMany({});
//     console.log('Cleared existing Spirituality collection');

//     const insertedSpiritualities = [];

//     for (const spirituality of spiritualityData) {
//       const spiritualityToCreate = {
//         ...spirituality,
//       };

//       if (spirituality.relevantSourceSlugs?.length) {
//         const sources = await Source.find({
//           slug: { $in: spirituality.relevantSourceSlugs },
//         });

//         if (sources.length !== spirituality.relevantSourceSlugs.length) {
//           const foundSlugs = sources.map((source) => source.slug);

//           const missingSlugs = spirituality.relevantSourceSlugs.filter(
//             (slug) => !foundSlugs.includes(slug)
//           );

//           throw new Error(
//             `Sources not found for slugs: ${missingSlugs.join(', ')}`
//           );
//         }

//         spiritualityToCreate.relevantSources = sources.map(
//           (source) => source._id
//         );
//       } else {
//         spiritualityToCreate.relevantSources = [];
//       }

//       delete spiritualityToCreate.relevantSourceSlugs;

//       const newSpirituality = await Spirituality.create(
//         spiritualityToCreate
//       );

//       insertedSpiritualities.push(newSpirituality);
//     }

//     console.log(
//       `${insertedSpiritualities.length} spiritualities seeded successfully.`
//     );
//   } catch (err) {
//     console.error('Error seeding spiritualities:', err);
//     throw err;
//   }
// }

// module.exports = seedSpiritualities;

// async function seedSpiritualities() {
//   console.log("Seeder script started2")
//   try {
//     console.log("Seeder script started3")
//     await Spirituality.deleteMany({});
//     console.log('Cleared existing Spirituality collection');
//     await Spirituality.insertMany(spiritualityData);
//     console.log('Inserted spiritualities into the database');
//   } catch (err) {
//     console.error('Error seeding spiritualities:', err);
//   }
// }

// module.exports = seedSpiritualities;
