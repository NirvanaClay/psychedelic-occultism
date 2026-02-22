const { slugify } = require('../middleware/slugMiddleware');

const techniques = [
  {
    name: 'Meditation',
    slug: slugify('Meditation'),
    description: 'Meditation is the practice of focusing the mind and achieving a state of relaxation or heightened awareness.',
  },
  {
    name: 'Manifestation',
    slug: slugify('Manifestation'),
    description: 'Manifestation is the process of bringing desires and goals into reality through focused intention and belief.',
  },
  {
    name: 'Tarot',
    slug: slugify('Tarot'),
    description: 'Tarot is a divination technique that uses a deck of symbolic cards to gain insights and guidance.',
  },
];

module.exports = techniques;