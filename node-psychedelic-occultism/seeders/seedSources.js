const Source = require('../models/Source');
const Person = require('../models/Person');
const Spirituality = require('../models/Spirituality');
const sourceData = require('../data/sourceData');

const seedSources = async () => {
  try {
    await Source.deleteMany({});
    console.log('Existing sources cleared.');

    const insertedSources = [];

    for (const source of sourceData) {
      const sourceToCreate = {
        ...source,
      };

      // Resolve people
      const peopleIds = [];

      for (const slug of source.personSlugs || []) {
        const person = await Person.findOne({ slug });

        if (!person) {
          throw new Error(
            `Person not found for slug: ${slug}`
          );
        }

        peopleIds.push(person._id);
      }

      sourceToCreate.people = peopleIds;

      // Resolve spiritualities
      const spiritualityIds = [];

      for (const slug of source.spiritualitySlugs || []) {
        const spirituality = await Spirituality.findOne({ slug });

        if (!spirituality) {
          throw new Error(
            `Spirituality not found for slug: ${slug}`
          );
        }

        spiritualityIds.push(spirituality._id);
      }

      sourceToCreate.spiritualities = spiritualityIds;

      // Remove seed-only fields
      delete sourceToCreate.personSlugs;
      delete sourceToCreate.spiritualitySlugs;

      const newSource = await Source.create(sourceToCreate);
      insertedSources.push(newSource);
    }

    console.log(
      `${insertedSources.length} sources seeded successfully.`
    );
  } catch (error) {
    console.error('Error seeding sources:', error);
    throw error;
  }
};

module.exports = seedSources;

// const Source = require('../models/Source'); // Update with the correct path to your Source model
// const Person = require('../models/Person'); // Ensure this is the correct path to your Person model
// const sourceData = require('../data/sourceData');

// const seedSources = async () => {
//   try {
//     await Source.deleteMany({});
//     console.log('Existing sources cleared.');

//     const insertedSources = [];

//     for (const source of sourceData) {
//       const sourceToCreate = {
//         ...source,
//       };

//       if (source.personSlug) {
//         const person = await Person.findOne({
//           slug: source.personSlug,
//         });

//         if (!person) {
//           throw new Error(
//             `Person not found for slug: ${source.personSlug}`
//           );
//         }

//         sourceToCreate.person = person._id;
//       }

//       delete sourceToCreate.personSlug;

//       const newSource = await Source.create(sourceToCreate);
//       insertedSources.push(newSource);
//     }

//     console.log(
//       `${insertedSources.length} sources seeded successfully.`
//     );
//   } catch (error) {
//     console.error('Error seeding sources:', error);
//     throw error;
//   }
// };

// module.exports = seedSources;
