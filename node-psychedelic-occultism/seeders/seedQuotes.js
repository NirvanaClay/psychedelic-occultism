const Quote = require('../models/Quote'); // Adjust path to your Quote model
const Source = require('../models/Source'); // Adjust path to your Source model
const Person = require('../models/Person'); // Adjust path to your Person model
const Spirituality = require('../models/Spirituality'); // Adjust path to your Spirituality model
const quoteData = require('../data/quoteData'); // Adjust path to your quote data file

const seedQuotes = async () => {
  try {
    // Clear existing quotes
    await Quote.deleteMany();
    console.log('Existing quotes deleted');

    let savedCount = 0;

    for (const quote of quoteData) {
      let personId = null;
      let sourceId = null;

      // Person — optional
      if (quote.personSlug) {
        const person = await Person.findOne({ slug: quote.personSlug });
        if (person) {
          personId = person._id;
        } else {
          console.warn(`Person with slug "${quote.personSlug}" not found for quote "${quote.text.slice(0, 60)}...". Saving without person reference.`);
        }
      } else {
        console.log(`No personSlug provided for quote "${quote.text.slice(0, 60)}...". Saving without person.`);
      }

      // Source — optional
      if (quote.sourceSlug) {
        const source = await Source.findOne({ slug: quote.sourceSlug });
        if (source) {
          sourceId = source._id;
        } else {
          console.warn(`Source with slug "${quote.sourceSlug}" not found for quote "${quote.text.slice(0, 60)}...". Saving without source reference.`);
        }
      } else {
        console.log(`No sourceSlug provided for quote "${quote.text.slice(0, 60)}...". Saving without source.`);
      }

      // Spirituality — already optional and handled well
      // let spiritualityIds = [];
      // if (quote.spiritualitySlug && Array.isArray(quote.spiritualitySlug)) {
      //   spiritualityIds = await Promise.all(
      //     quote.spiritualitySlug.map(async (slug) => {
      //       const spiritualItem = await Spirituality.findOne({ slug });
      //       if (!spiritualItem) {
      //         console.warn(`Spirituality with slug "${slug}" not found for quote "${quote.text.slice(0, 60)}..."`);
      //         return null;
      //       }
      //       return spiritualItem._id;
      //     })
      //   );
      //   spiritualityIds = spiritualityIds.filter(id => id !== null);
      // }

      let spiritualityIds = [];

      if (quote.spiritualitySlugs && Array.isArray(quote.spiritualitySlugs)) {
        spiritualityIds = await Promise.all(
          quote.spiritualitySlugs.map(async (slug) => {
            const spiritualItem = await Spirituality.findOne({ slug });

            if (!spiritualItem) {
              console.warn(
                `Spirituality with slug "${slug}" not found for quote "${quote.text.slice(0, 60)}..."`
              );

              return null;
            }

            return spiritualItem._id;
          })
        );

        spiritualityIds = spiritualityIds.filter(id => id !== null);
      }
      // Create and save (person/source can be null)
      // const newQuote = new Quote({
      //   text: quote.text,
      //   person: personId,       // null is allowed
      //   source: sourceId,       // null is allowed
      //   spirituality: spiritualityIds,
      //   likes: quote.likes || 0,
      //   likedBy: quote.likedBy || [],
      // });

      const newQuote = new Quote({
        text: quote.text,
        person: personId,
        source: sourceId,
        spiritualities: spiritualityIds,
        likes: quote.likes || 0,
        likedBy: quote.likedBy || [],
      });

      await newQuote.save();
      savedCount++;
      console.log(`Quote saved: "${quote.text.slice(0, 60)}..."`);
    }

    console.log(`Quotes seeding completed — ${savedCount} quotes saved`);
  } catch (err) {
    console.error('Error seeding quotes:', err);
    throw err;
  }
};

module.exports = seedQuotes;
