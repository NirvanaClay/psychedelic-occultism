const Person = require('../models/Person');
const Source = require('../models/Source');
const Spirituality = require('../models/Spirituality');
const Quote = require('../models/Quote');

const personData = require('../data/personData');
const sourceData = require('../data/sourceData');
const spiritualityData = require('../data/spiritualityData');
const quoteData = require('../data/quoteData');

const resolveRelationships = async () => {
  try {
    // PERSON -> SPIRITUALITIES
    for (const personItem of personData) {
      const person = await Person.findOne({ slug: personItem.slug });

      if (!person) {
        throw new Error(`Person not found: ${personItem.slug}`);
      }

      if (personItem.spiritualitySlugs?.length) {
        const spiritualities = await Spirituality.find({
          slug: { $in: personItem.spiritualitySlugs },
        });

        if (spiritualities.length !== personItem.spiritualitySlugs.length) {
          throw new Error(
            `One or more spiritualities not found for ${personItem.name}`
          );
        }

        person.spiritualities = spiritualities.map(
          (spirituality) => spirituality._id
        );
      }

      await person.save();
    }

    // SOURCE -> PERSON
    for (const sourceItem of sourceData) {
      if (!sourceItem.personSlug) continue;

      const source = await Source.findOne({ slug: sourceItem.slug });

      if (!source) {
        throw new Error(`Source not found: ${sourceItem.slug}`);
      }

      const person = await Person.findOne({
        slug: sourceItem.personSlug,
      });

      if (!person) {
        throw new Error(
          `Person not found for source ${sourceItem.title}: ${sourceItem.personSlug}`
        );
      }

      source.person = person._id;
      await source.save();
    }

    // SPIRITUALITY -> SOURCES
    for (const spiritualityItem of spiritualityData) {
      const spirituality = await Spirituality.findOne({
        slug: spiritualityItem.slug,
      });

      if (!spirituality) {
        throw new Error(
          `Spirituality not found: ${spiritualityItem.slug}`
        );
      }

      if (spiritualityItem.relevantSourceSlugs?.length) {
        const sources = await Source.find({
          slug: { $in: spiritualityItem.relevantSourceSlugs },
        });

        if (
          sources.length !== spiritualityItem.relevantSourceSlugs.length
        ) {
          throw new Error(
            `One or more sources not found for ${spiritualityItem.name}`
          );
        }

        spirituality.relevantSources = sources.map(
          (source) => source._id
        );
      }

      await spirituality.save();
    }

    // QUOTE -> PERSON / SOURCE / SPIRITUALITIES
    for (const quoteItem of quoteData) {
      const quote = await Quote.findOne({ text: quoteItem.text });

      if (!quote) {
        throw new Error(
          `Quote not found: ${quoteItem.text.slice(0, 50)}`
        );
      }

      if (quoteItem.personSlug) {
        const person = await Person.findOne({
          slug: quoteItem.personSlug,
        });

        if (!person) {
          throw new Error(
            `Person not found for quote: ${quoteItem.personSlug}`
          );
        }

        quote.person = person._id;
      }

      if (quoteItem.sourceSlug) {
        const source = await Source.findOne({
          slug: quoteItem.sourceSlug,
        });

        if (!source) {
          throw new Error(
            `Source not found for quote: ${quoteItem.sourceSlug}`
          );
        }

        quote.source = source._id;
      }

      if (quoteItem.spiritualitySlugs?.length) {
        const spiritualities = await Spirituality.find({
          slug: { $in: quoteItem.spiritualitySlugs },
        });

        if (
          spiritualities.length !== quoteItem.spiritualitySlugs.length
        ) {
          throw new Error(
            'One or more spiritualities not found for quote'
          );
        }

        quote.spiritualities = spiritualities.map(
          (spirituality) => spirituality._id
        );
      }

      await quote.save();
    }

    console.log('Relationships resolved successfully.');
  } catch (error) {
    console.error('Error resolving relationships:', error);
    throw error;
  }
};

module.exports = resolveRelationships;