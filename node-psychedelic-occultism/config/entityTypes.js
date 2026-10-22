const entityTypes = {
  Concept: {
    model: require('../models/Concept'),
    searchField: 'name',
    displayField: 'name',
    label: 'Concepts',
  },

  Source: {
    model: require('../models/Source'),
    searchField: 'title',
    displayField: 'title',
    label: 'Sources',
  },

  Person: {
    model: require('../models/Person'),
    searchField: 'name',
    displayField: 'name',
    label: 'People',
  },

  Spirituality: {
    model: require('../models/Spirituality'),
    searchField: 'name',
    displayField: 'name',
    label: 'Spiritualities',
  },
};

module.exports = entityTypes;
