const { slugify } = require('../middleware/slugMiddleware');

const sourceData = [
  {
    title: 'The Book of the Law',
    personSlug: slugify('Aleister Crowley'),
    type: 'Book',
    image: '/images/book.png',
    description: 'A foundational text of Thelema, written by Aleister Crowley. It contains the core principles of the system.',
    publicationDate: '1904-04-08',
  },
  {
    title: 'Magick Without Tears',
    personSlug: slugify('Aleister Crowley'),
    type: 'Book',
    image: '/images/book.png',
    description: 'A series of letters written by Aleister Crowley explaining magickal theory and practice in a straightforward manner.',
    publicationDate: '1954-01-01',
  },
  {
    title: 'Food of the Gods',
    personSlug: slugify('Terence McKenna'),
    type: 'Book',
    image: '/images/book.png',
    description: 'Terence McKenna explores the relationship between humanity and psychoactive plants, tracing its influence on culture and society.',
    publicationDate: '1992-01-01',
  },
  {
    title: 'True Hallucinations',
    personSlug: slugify('Terence McKenna'),
    type: 'Book',
    image: '/images/book.png',
    description: 'An autobiographical account of Terence McKenna’s adventures in the Amazon and the exploration of hallucinogens.',
    publicationDate: '1993-01-01',
  },
  {
    title: 'The Psychedelic Experience',
    personSlug: slugify('Timothy Leary'),
    type: 'Book',
    image: '/images/book.png',
    description: 'A manual based on the Tibetan Book of the Dead, authored by Timothy Leary and colleagues, to guide psychedelic journeys.',
    publicationDate: '1964-01-01',
  },
  {
    title: 'Politics of Ecstasy',
    personSlug: slugify('Timothy Leary'),
    type: 'Book',
    image: '/images/book.png',
    description: 'A collection of essays by Timothy Leary on the social, political, and psychological implications of psychedelic use.',
    publicationDate: '1968-01-01',
  },
  {
    title: 'The Book: On the Taboo Against Knowing Who You Are',
    personSlug: slugify('Alan Watts'),
    type: 'Book',
    image: '/images/book.png',
    description: 'Alan Watts explores the illusion of the self and the unity of existence in this thought-provoking book.',
    publicationDate: '1966-01-01',
  },
  {
    title: 'The Wisdom of Insecurity',
    personSlug: slugify('Alan Watts'),
    type: 'Book',
    image: '/images/book.png',
    description: 'Alan Watts delves into the human struggle for security and the value of embracing the present moment.',
    publicationDate: '1951-01-01',
  },
  {
    title: 'Programming and Metaprogramming in the Human Biocomputer',
    personSlug: slugify('John Lilly'),
    type: 'Book',
    image: '/images/book.png',
    description: 'John Lilly examines the mind as a programmable computer, exploring altered states of consciousness and self-experimentation.',
    publicationDate: '1967-01-01',
  },
  {
    title: 'Center of the Cyclone',
    personSlug: slugify('John Lilly'),
    type: 'Book',
    image: '/images/book.png',
    description: 'John Lilly provides an account of his personal experiences with altered states of consciousness and sensory isolation tanks.',
    publicationDate: '1972-01-01',
  },
];

sourceData.forEach((item) => {
  item.slug = slugify(item.title);
});

module.exports = sourceData;
