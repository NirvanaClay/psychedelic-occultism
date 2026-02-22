const { slugify } = require('../middleware/slugMiddleware');

const personData = [
  {
    name: 'Aleister Crowley',
    image: '/images/crowley.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    spiritualitySlug: ['occultism']
  },
  {
    name: 'Terence McKenna',
    image: '/images/mckenna.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    spiritualitySlug: ['psychedelics']
  },
  {
    name: 'Timothy Leary',
    image: '/images/leary.webp',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    spiritualitySlug: ['psychedelics']
  },
  {
    name: 'Alan Watts',
    image: '/images/watts.webp',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    spiritualitySlug: ['eastern-spirituality']
  },
  {
    name: 'John Lilly',
    image: '/images/lilly1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    spiritualitySlug: ['psychedelics']
  }
];

personData.forEach((item) => {
  item.slug = slugify(item.name);
});

module.exports = personData;
