const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techniqueSchema = new Schema({
  name: String,
  description: String,
  contributedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  relatedSystems: [{ type: Schema.Types.ObjectId, ref: 'spiritualSystem' }],
  methods: [String],
  tags: [String],
  dateAdded: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;
