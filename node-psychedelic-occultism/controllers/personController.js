const express = require('express');
const router = express.Router();

const Person = require('../models/Person');
const Source = require('../models/Source');
const Quote = require('../models/Quote');

const findPerson = async (identifier) => {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

  return isObjectId
    ? Person.findById(identifier)
    : Person.findOne({ slug: identifier });
};

// Get all people
router.get('/all', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get quotes belonging to a person
router.get('/:identifier/quotes', async (req, res) => {
  try {
    const person = await findPerson(req.params.identifier);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    const quotes = await Quote.find({
      person: person._id,
    })
      .populate('person', 'name slug')
      .populate('source', 'title slug');

    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes for person:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.get('/:identifier/quotes', async (req, res) => {
//   try {
//     const person = await findPerson(req.params.identifier);

//     if (!person) {
//       return res.status(404).json({ error: 'Person not found' });
//     }

//     const quotes = await Quote.find({ person: person._id })
//       .populate('person', 'name slug');

//     res.json(quotes);
//   } catch (error) {
//     console.error('Error fetching person quotes:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// Get sources belonging to a person
router.get('/:identifier/sources', async (req, res) => {
  try {
    const person = await findPerson(req.params.identifier);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // const sources = await Source.find({ person: person._id });
    const sources = await Source.find({
      people: person._id,
    });

    res.json(sources);
  } catch (error) {
    console.error('Error fetching person sources:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific person
router.get('/:identifier', async (req, res) => {
  try {
    const person = await findPerson(req.params.identifier);

    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new person
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();

    res.status(201).json(savedPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(400).json({ error: 'Failed to create person' });
  }
});

// Update a person
router.put('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(400).json({ error: 'Failed to update person' });
  }
});

// Delete a person
router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Person = require('../models/Person'); // Update path as necessary
// const Source = require('../models/Source');
// const Quote = require('../models/Quote');

// // Get all persons
// router.get('/all', async (req, res) => {
//   try {
//     const persons = await Person.find();
//     res.json(persons);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get a specific person by ID
// router.get('/:identifier', async (req, res) => {
//   try {
//     const { identifier } = req.params;

//     // Check if identifier is a valid MongoDB ObjectId
//     const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

//     const person = isObjectId
//       ? await Person.findById(identifier) // Fetch by ID if it's a valid ObjectId
//       : await Person.findOne({ slug: identifier }); // Otherwise, fetch by slug

//     if (!person) return res.status(404).json({ error: "Person not found" });

//     res.json(person);
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });


// // Add a new person
// router.post('/', async (req, res) => {
//   try {
//     const { name, image, bio } = req.body;
//     const newPerson = new Person({ name, image, bio });
//     const savedPerson = await newPerson.save();
//     res.status(201).json(savedPerson);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create person' });
//   }
// });

// // Update an existing person
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, image, bio } = req.body;
//     const updatedPerson = await Person.findByIdAndUpdate(
//       req.params.id,
//       { name, image, bio },
//       { new: true, runValidators: true }
//     );
//     if (!updatedPerson) return res.status(404).json({ error: 'Person not found' });
//     res.json(updatedPerson);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to update person' });
//   }
// });

// router.get('/:slug/quotes', async (req, res) => {
//   const person = await Person.findOne({ slug: req.params.slug });
//   if (!person) return res.status(404).json({ error: 'Person not found' });
//   const quotes = await Quote.find({ person: person._id });
//   res.json(quotes);
// });

// router.get('/:slug/sources', async (req, res) => {
//   const person = await Person.findOne({ slug: req.params.slug });
//   if (!person) return res.status(404).json({ error: 'Person not found' });
//   const sources = await Source.find({ person: person._id });
//   res.json(sources);
// });

// // Delete a person
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedPerson = await Person.findByIdAndDelete(req.params.id);
//     if (!deletedPerson) return res.status(404).json({ error: 'Person not found' });
//     res.json({ message: 'Person deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
