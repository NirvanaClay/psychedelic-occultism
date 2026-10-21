const Person = require('../models/Person');
const Spirituality = require('../models/Spirituality');
const personData = require('../data/personData');

const seedPeople = async () => {
  try {
    console.log('Seeding people...');

    await Person.deleteMany({});
    console.log('Existing people data cleared');

    const updatedPeople = [];

    for (const person of personData) {
      const spiritualityIds = [];

      for (const slug of person.spiritualitySlugs || []) {
        const spirituality = await Spirituality.findOne({ slug });

        if (!spirituality) {
          console.warn(`Warning: Spirituality not found for slug: ${slug}`);
          continue;
        }

        spiritualityIds.push(spirituality._id);
      }

      const newPerson = {
        ...person,
        spiritualities: spiritualityIds,
      };

      delete newPerson.spiritualitySlugs;

      updatedPeople.push(newPerson);
    }

    await Person.insertMany(updatedPeople);

    console.log('Person data seeded successfully');
  } catch (error) {
    console.error('Error seeding people:', error);
    throw error;
  }
};

module.exports = seedPeople;

// const Person = require('../models/Person');
// const Spirituality = require('../models/Spirituality');
// const personData = require('../data/personData');

// const seedPeople = async () => {
//   try {
//     console.log('Seeding people...');

//     await Person.deleteMany({});
//     console.log('Existing people data cleared');

//     const updatedPeople = [];

//     for (const person of personData) {
//       const spiritualityIds = [];

//       for (const slug of person.spiritualitySlug || []) {
//         const spirituality = await Spirituality.findOne({ slug });

//         if (!spirituality) {
//           console.warn(`Warning: Spirituality not found for slug: ${slug}`);
//           continue;
//         }

//         spiritualityIds.push(spirituality._id);
//       }

//       const newPerson = {
//         ...person,
//         spirituality: spiritualityIds,
//       };

//       delete newPerson.spiritualitySlug;

//       updatedPeople.push(newPerson);
//     }

//     await Person.insertMany(updatedPeople);
//     console.log('Person data seeded successfully');
//     console.log('updated people are:')
//     console.log(updatedPeople)
//   } catch (error) {
//     console.error('Error seeding people:', error);
//     throw error;
//   }
// };

// module.exports = seedPeople;