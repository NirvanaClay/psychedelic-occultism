const { slugify } = require('../middleware/slugMiddleware');

const spiritualityData = [
  {
    name: 'Christianity',
    defaultDescription: 'The teachings of Jesus Christ and the Bible.',
    relevantBooks: [],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Eastern Spirituality',
    defaultDescription: 'The spirituality of the East.',
    relevantBooks: [],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Occultism',
    defaultDescription: 'The western occult tradition of esoteric truths and correspondences.',
    relevantBooks: [],
    significantQuotes: [],
    ideaExplorations: []
  },
  {
    name: 'Psychedelics',
    defaultDescription: 'The path of using entheogenic substances to assist in spiritual and personal growth.',
    relevantBooks: [],
    significantQuotes: [],
    ideaExplorations: []
  }
];

spiritualityData.forEach((item) => {
  item.slug = slugify(item.name);
});

module.exports = spiritualityData;
