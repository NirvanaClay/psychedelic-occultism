const baseSources = [
  {
    title: 'Source One',
    type: 'Book',
    image: '/images/book.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    publicationDate: '2023-01-01',
    tags: [],
    relatedSystems: [],
  },
  {
    title: 'Source Two',
    type: 'Book',
    image: '/images/book.png',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    publicationDate: '2023-02-01',
    tags: [],
    relatedSystems: [],
  },
  {
    title: 'Source Three',
    type: 'Book',
    image: '/images/book.png',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    publicationDate: '2023-03-01',
    tags: [],
    relatedSystems: [],
  },
  {
    title: 'Source Four',
    type: 'Book',
    image: '/images/book.png',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publicationDate: '2023-04-01',
    tags: [],
    relatedSystems: [],
  },
  {
    title: 'Source Five',
    type: 'Book',
    image: '/images/book.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    publicationDate: '2023-05-01',
    tags: [],
    relatedSystems: [],
  },
];

const sources = {
  Christianity: [...baseSources],
  'Eastern Spirituality': [...baseSources],
  Occultism: [...baseSources],
};

module.exports = sources;
