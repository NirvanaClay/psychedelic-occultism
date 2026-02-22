const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { generateSlug } = require('../middleware/slugMiddleware');

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  image: String,
  bio: String,
  spirituality: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spirituality',
  }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

personSchema.virtual('books', {
  ref: 'Source',
  localField: '_id',
  foreignField: 'person',
  justOne: false,
  options: { match: { type: 'Book' } },
});

generateSlug(personSchema);

const Person = mongoose.model('Person', personSchema);

module.exports = Person; // Corrected this line

