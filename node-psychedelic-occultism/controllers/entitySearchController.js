const express = require('express');
const router = express.Router();

const entityTypes = require('../config/entityTypes');
const protect = require('../middleware/authMiddleware');

router.get('/types', protect, (req, res) => {
  const types = Object.entries(entityTypes).map(([value, config]) => ({
    value,
    label: config.label,
  }));

  res.json({ types });
});

router.get('/', protect, async (req, res) => {
  try {
    const { q = '', type = '' } = req.query;

    const search = q.trim();

    if (!search) {
      return res.json({ results: [] });
    }

    // Validate the requested entity type
    if (type && !entityTypes[type]) {
      return res.status(400).json({
        error: 'Invalid entity type',
      });
    }

    // Escape special regex characters
    const escapedSearch = search.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&'
    );

    const regex = new RegExp(escapedSearch, 'i');

    // Search all configured types, or one specific type
    const searches = Object.entries(entityTypes)
      .filter(([modelName]) => !type || type === modelName)
      .map(async ([modelName, config]) => {
        const documents = await config.model
          .find({
            [config.searchField]: regex,
          })
          .select(`${config.displayField} slug image`)
          .limit(10)
          .lean();

        return documents.map((document) => ({
          refModel: modelName,
          refId: document._id,
          name: document[config.displayField],
          slug: document.slug || '',
          image: document.image || '',
        }));
      });

    const results = (await Promise.all(searches)).flat();

    res.json({ results });

  } catch (error) {
    console.error('Error searching entities:', error);

    res.status(500).json({
      error: 'Failed to search entities',
    });
  }
});

module.exports = router;
