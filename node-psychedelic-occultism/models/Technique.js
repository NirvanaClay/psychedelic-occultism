const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { generateSlug } = require('../middleware/slugMiddleware')

const techniqueSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  slug: { type: String, required: true, unique: true },
  contributedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  relatedSystems: [{ type: Schema.Types.ObjectId, ref: 'spiritualSystem' }],
  methods: [String],
  tags: [String],
  dateAdded: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

generateSlug(techniqueSchema);

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
