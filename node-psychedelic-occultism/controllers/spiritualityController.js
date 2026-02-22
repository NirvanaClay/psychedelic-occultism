const express = require('express');
const router = express.Router();

const Spirituality = require('../models/Spirituality');
const spiritualities = require('../data/spiritualityData')

const Quote = require('../models/Quote')
const Summary = require('../models/Summary')
const IdeaExploration = require('../models/IdeaExploration')
const Source = require('../models/Source')
const Person = require('../models/Person')
const Tag = require('../models/Tag')

const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/all', async (req, res) => {
    try {
        const spiritualities = await Spirituality.find();
        res.json(spiritualities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const spirituality = await Spirituality.findById(req.params.id);
        if (!spirituality) {
            return res.status(404).json({ message: 'Spiritual system not found' });
        }
        res.json(spirituality);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id/quotes', async (req, res) => {
    const spiritualityId = req.params.id;
    try {
        const quotes = await Quote.find({ spirituality: spiritualityId })
        .populate('person');
        
        if (quotes.length > 0) {
            res.json(quotes);  // Return the array of quotes
        } else {
            res.json({ message: 'No quotes associated with this spirituality.' }); // Return a message if no quotes are found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching quotes.' });
    }
});

router.get('/:id/summaries', async (req, res) => {
  const spiritualityId = req.params.id;
  try {
      const summaries = await Summary.find({ spirituality: spiritualityId });
      if (summaries.length > 0) {
          res.json(summaries);  // Return the array of quotes
      } else {
          res.json({ message: 'No summaries associated with this spirituality.' }); // Return a message if no quotes are found
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching summaries:', error });
  }
});

router.get('/:id/summaries/:id2', async (req, res) => {
    const { id: spiritualityId, id2: summaryId } = req.params; // Extract the spirituality and summary IDs
    console.log("Running GET route for summary.")
    try {
      const summary = await Summary.findOne({ _id: summaryId, spirituality: spiritualityId }); // Query for the specific summary under the given spirituality
      if (summary) {
        res.json(summary); // Return the summary if found
      } else {
        res.status(404).json({ message: 'Summary not found for this spirituality.' }); // Return a 404 if not found
      }
    } catch (error) {
      console.error('Error fetching specific summary:', error);
      res.status(500).json({ error: 'An error occurred while fetching the specific summary.' });
    }
  });
  

router.get('/:id/ideaExplorations', async (req, res) => {
    const spiritualityId = req.params.id;
    try {
        const ideaExplorations = await IdeaExploration.find({ spirituality: spiritualityId });
        if (ideaExplorations.length > 0) {
            res.json(ideaExplorations);  // Return the array of quotes
        } else {
            res.json({ message: 'No summaries associated with this spirituality.' }); // Return a message if no quotes are found
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching summaries:', error });
    }
  });

  router.get('/:id1/ideaExplorations/:id2', async (req, res) => {
    const { id1: spiritualityId, id2: ideaId } = req.params;
    try {
      // Query for the specific idea exploration by its ID and spirituality ID
      const ideaExploration = await IdeaExploration.findOne({
        _id: ideaId,
        spirituality: spiritualityId, // Ensure it's tied to the correct spirituality
      });
  
      if (ideaExploration) {
        console.log("Idea found:")
        console.log(ideaExploration)
        res.json(ideaExploration); // Return the idea exploration if found
      } else {
        res.status(404).json({
          message: 'Idea Exploration not found for this spirituality.',
        }); // Return a 404 if not found
      }
    } catch (error) {
      console.error('Error fetching idea exploration:', error);
      res.status(500).json({
        error: 'An error occurred while fetching the idea exploration.',
      });
    }
  });
  

  router.get('/:id/sources', async (req, res) => {
    const spiritualityId = req.params.id;
    console.log(`Fetching sources for spiritualityId: ${spiritualityId}`);
    try {
      const sources = await Source.find({ relatedSystems: spiritualityId }); // Query the relatedSystems array
      console.log('Sources found:', sources);
      if (sources.length > 0) {
        res.json(sources);
      } else {
        res.json({ message: 'No sources associated with this spirituality.' });
      }
    } catch (error) {
      console.error('Error fetching sources:', error);
      res.status(500).json({ error: 'An error occurred while fetching sources.' });
    }
  });

  router.get('/:id1/sources/:id2', async (req, res) => {
    const { id1: spiritualityId, id2: sourceId } = req.params;
    console.log("hello?")
  
    try {
      // Find the specific source linked to the given spirituality
      const source = await Source.findOne({
        _id: sourceId,
        relatedSystems: spiritualityId, // Ensure the source is linked to this spirituality
      }).populate('relatedSystems tags person');
  
      if (source) {
        console.log(source)
        res.json(source); // Return the source if found
      } else {
        res.status(404).json({
          message: 'Source not found for this spirituality.',
        });
      }
    } catch (error) {
      console.error('Error fetching source:', error);
      res.status(500).json({
        error: 'An error occurred while fetching the source.',
      });
    }
  });

  router.get('/:id/people', async (req, res) => {
    const spiritualityId = req.params.id; // Extract spirituality ID from the request parameters
    console.log(`Fetching people for spiritualityId: ${spiritualityId}`);
    
    try {
      // Query the Person model for entries where 'spirituality' includes the given spiritualityId
      const people = await Person.find({ spirituality: spiritualityId }); 
      
      console.log('People found:', people);
      if (people.length > 0) {
        res.json(people);
      } else {
        res.json({ message: 'No people associated with this spirituality.' });
      }
    } catch (error) {
      console.error('Error fetching people:', error);
      res.status(500).json({ error: 'An error occurred while fetching people.' });
    }
  });
  
  
  

// router.post('/:id/summaries', authenticateToken);
// router.get('/:id1/summaries/:id2');

router.post('/populate', async (req, res) => {
    try {
      await Spirituality.insertMany(spiritualities);
      res.status(200).send('Spiritualities have been added to the database');
    } catch (error) {
      res.status(500).send('Error populating the database: ' + error.message);
    }
  });

module.exports = router;
