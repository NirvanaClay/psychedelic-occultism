const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaExplorationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    spirituality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spirituality',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const IdeaExploration = mongoose.model('IdeaExploration', IdeaExplorationSchema);

module.exports = IdeaExploration;
