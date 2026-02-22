const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  description: String,
  type: {
    type: String,
    enum: ['Book', 'Talk', 'Article', 'Video', 'Other'],
    required: true,
  },
  image: String,
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
  },
  publicationDate: Date,
  relatedSystems: [{ type: Schema.Types.ObjectId, ref: 'Spirituality' }],
  description: String,
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Source', SourceSchema);
