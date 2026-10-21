
const entityTypes = {
  Concept: {
    model: require('../models/Concept'),
    searchField: 'name',
    displayField: 'name',
  },

  Source: {
    model: require('../models/Source'),
    searchField: 'title',
    displayField: 'title',
  },

  Person: {
    model: require('../models/Person'),
    searchField: 'name',
    displayField: 'name',
  },
};

module.exports = entityTypes;
