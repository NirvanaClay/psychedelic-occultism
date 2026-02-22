const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpiritualitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: { type: String, required: true, unique: true },
  defaultDescription: {
    type: String,
    required: true,
  },
  relevantBooks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Source'
  }],
  significantQuotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quote',
  }],
  summaries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Summary',
  }],
  ideaExplorations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  }],
  practices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practice',
  }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Spirituality', SpiritualitySchema);

