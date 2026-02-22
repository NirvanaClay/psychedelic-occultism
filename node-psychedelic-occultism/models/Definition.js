// models/Definition.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DefinitionSchema = new Schema(
  {
    concept: {
      type: Schema.Types.ObjectId,
      ref: 'Concept',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    favoriteCount: {
      type: Number,
      default: 0
    }
  }
);

module.exports = mongoose.model('Definition', DefinitionSchema);
