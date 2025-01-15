const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  title: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  elements: [{
    modelType: String,  // E.g., "Experience", "Quote", "IdeaExploration"
    modelId: { type: Schema.Types.ObjectId }
  }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dateCreated: { type: Date, default: Date.now }
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
