const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

PersonSchema.virtual('books', {
  ref: 'Source',
  localField: '_id',
  foreignField: 'person',
  justOne: false,
  options: { match: { type: 'Book' } },
});

module.exports = mongoose.model('Person', PersonSchema);
