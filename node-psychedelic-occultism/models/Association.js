const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entitySchema = new Schema({
  refModel: {
    type: String,
    required: true,
  },
  refId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { _id: false });

const AssociationSchema = new Schema({
  entityA: {
    type: entitySchema,
    required: true,
  },

  entityB: {
    type: entitySchema,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Prevent duplicate relationships for the same user
AssociationSchema.index(
  {
    createdBy: 1,
    'entityA.refModel': 1,
    'entityA.refId': 1,
    'entityB.refModel': 1,
    'entityB.refId': 1,
  },
  { unique: true }
);

module.exports = mongoose.model('Association', AssociationSchema);