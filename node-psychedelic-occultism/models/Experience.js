const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  system: [{ type: Schema.Types.ObjectId, ref: 'spiritualSystem' }],
  techniques: [String], 
  tags: [String], 
  date: Date,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Experience', ExperienceSchema);