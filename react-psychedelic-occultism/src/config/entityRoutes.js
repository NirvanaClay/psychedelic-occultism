const entityRoutes = {
  Source: {
    path: (entity) => `/sources/${entity.refId}`,
    identifier: 'refId',
  },

  Person: {
    path: (entity) => `/people/${entity.slug}`,
    identifier: 'slug',
  },

  Concept: {
    path: (entity) => `/concepts/${entity.slug}`,
    identifier: 'slug',
  },

  Experience: {
    path: (entity) => `/experiences/${entity.refId}`,
    identifier: 'refId',
  },

  Technique: {
    path: (entity) => `/techniques/${entity.slug}`,
    identifier: 'slug',
  },

  Spirituality: {
    path: (entity) => `/spirituality/${entity.refId}`,
    identifier: 'refId',
  },
};

export const getEntityUrl = (entity) => {
  const config = entityRoutes[entity.refModel];

  if (!config) return null;

  if (!entity[config.identifier]) return null;

  return config.path(entity);
};