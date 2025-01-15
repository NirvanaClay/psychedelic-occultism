const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
  content: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  relatedModel: { 
    modelType: String,  // E.g., "Experience", "Quote", "Technique", etc.
    modelId: { type: Schema.Types.ObjectId }  // ID of the related model
  },
  dateCreated: { type: Date, default: Date.now },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Discussion' }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;

