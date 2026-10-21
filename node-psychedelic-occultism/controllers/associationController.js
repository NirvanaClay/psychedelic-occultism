const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Association = require('../models/Association');
const protect = require('../middleware/authMiddleware');

// Get the logged-in user's associations for a specific entity
router.get('/:refModel/:refId', protect, async (req, res) => {
  try {
    const { refModel, refId } = req.params;

    if (!mongoose.isValidObjectId(refId)) {
      return res.status(400).json({
        error: 'Invalid entity ID',
      });
    }

    const associations = await Association.find({
      createdBy: req.user.userId,
      $or: [
        {
          'entityA.refModel': refModel,
          'entityA.refId': refId,
        },
        {
          'entityB.refModel': refModel,
          'entityB.refId': refId,
        },
      ],
    }).lean();

    // Retrieve the corresponding entity information
    const populatedAssociations = await Promise.all(
      associations.map(async (association) => {
        const populateEntity = async (entity) => {
          const Model = mongoose.model(entity.refModel);

          const document = await Model.findById(entity.refId)
            .select('name title slug image')
            .lean();

          return {
            refModel: entity.refModel,
            refId: entity.refId,
            name: document?.name || document?.title || '',
            slug: document?.slug || '',
            image: document?.image || '',
          };
        };

        return {
          ...association,
          entityA: await populateEntity(association.entityA),
          entityB: await populateEntity(association.entityB),
        };
      })
    );

    res.json({ associations: populatedAssociations });

  } catch (error) {
    console.error('Error fetching associations:', error);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { subject, association } = req.body;

    if (
      !subject?.refModel ||
      !association?.refModel ||
      !mongoose.isValidObjectId(subject.refId) ||
      !mongoose.isValidObjectId(association.refId)
    ) {
      return res.status(400).json({
        error: 'Invalid association data',
      });
    }

    // Prevent self-associations
    if (
      subject.refModel === association.refModel &&
      subject.refId.toString() === association.refId.toString()
    ) {
      return res.status(400).json({
        error: 'An entity cannot be associated with itself',
      });
    }

    // Generate consistent identifiers for ordering
    const subjectKey = `${subject.refModel}:${subject.refId.toString()}`;
    const associationKey = `${association.refModel}:${association.refId.toString()}`;

    // Always store entities in the same order
    const [entityA, entityB] =
      subjectKey < associationKey
        ? [subject, association]
        : [association, subject];

    const existingAssociation = await Association.findOne({
      createdBy: req.user.userId,
      'entityA.refModel': entityA.refModel,
      'entityA.refId': entityA.refId,
      'entityB.refModel': entityB.refModel,
      'entityB.refId': entityB.refId,
    });

    if (existingAssociation) {
      return res.status(400).json({
        error: 'This association already exists',
      });
    }

    const newAssociation = await Association.create({
      entityA,
      entityB,
      createdBy: req.user.userId,
    });

    res.status(201).json(newAssociation);

  } catch (error) {
    console.error('Error adding association:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: 'This association already exists',
      });
    }

    res.status(500).json({
      error: 'Failed to add association',
    });
  }
});

// Remove an association from either direction
router.delete('/:refModel/:refId', protect, async (req, res) => {
  try {
    const { refModel, refId } = req.params;
    const { associationRefModel, associationRefId } = req.body;

    if (
      !mongoose.isValidObjectId(refId) ||
      !mongoose.isValidObjectId(associationRefId)
    ) {
      return res.status(400).json({
        error: 'Invalid association IDs',
      });
    }

    const deletedAssociation = await Association.findOneAndDelete({
      createdBy: req.user.userId,
      $or: [
        {
          'entityA.refModel': refModel,
          'entityA.refId': refId,
          'entityB.refModel': associationRefModel,
          'entityB.refId': associationRefId,
        },
        {
          'entityA.refModel': associationRefModel,
          'entityA.refId': associationRefId,
          'entityB.refModel': refModel,
          'entityB.refId': refId,
        },
      ],
    });

    if (!deletedAssociation) {
      return res.status(404).json({
        error: 'Association not found',
      });
    }

    res.json({
      message: 'Association deleted successfully',
      association: deletedAssociation,
    });

  } catch (error) {
    console.error('Error removing association:', error);
    res.status(500).json({
      error: 'Failed to remove association',
    });
  }
});

module.exports = router;