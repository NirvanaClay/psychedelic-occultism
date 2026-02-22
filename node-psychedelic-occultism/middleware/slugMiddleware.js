const slugify = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};

const generateSlug = function (schema, fieldName = 'name', slugField = 'slug') {
  schema.pre('save', function (next) {
    if (this.isModified(fieldName)) {
      this[slugField] = slugify(this[fieldName]);
    }
    next();
  });
};

module.exports = { slugify, generateSlug };
