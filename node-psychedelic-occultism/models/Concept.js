// models/Concept.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { generateSlug } = require('../middleware/slugMiddleware');

const ConceptSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      // required: true,
      unique: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    // If you want to store references to IdeaExplorations:
    ideaExplorations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'IdeaExploration',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true, // auto-manages createdAt, updatedAt
  }
);

generateSlug(ConceptSchema)

module.exports = mongoose.model('Concept', ConceptSchema);
