// config/entityRoutes.js

const entityRoutes = {
  Source: (entity) => `/sources/${entity.refId}`,
  Person: (entity) => `/people/${entity.slug}`,
  Experience: (entity) => `/experiences/${entity.refId}`,
  Technique: (entity) => `/techniques/${entity.slug}`,
  Spirituality: (entity) => `/spirituality/${entity.refId}`,
};

export const getEntityUrl = (entity) => {
  const getRoute = entityRoutes[entity.refModel];

  if (!getRoute) return null;

  const usesSlug = ['Person', 'Technique'].includes(entity.refModel);

  if (usesSlug && !entity.slug) return null;
  if (!usesSlug && !entity.refId) return null;

  return getRoute(entity);
};