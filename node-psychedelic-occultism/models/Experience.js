const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: [
      'Dream',
      'Psychedelic',
      'Meditation',
      'Mystical',
      'Synchronicity',
      'Other',
    ],
    required: true,
  },

  associations: [{
    refModel: {
      type: String,
      enum: [
        'Person',
        'Source',
        'Spirituality',
        'Technique',
      ],
      required: true,
    },

    refId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'associations.refModel',
    },

    _id: false,
  }],

  tags: [String],

  privacy: {
    type: String,
    enum: [
      'Public',
      'Members Only',
      'Friends Only',
      'Private',
      'Anonymous',
    ],
    default: 'Public',
  },

  date: Date,

  likes: {
    type: Number,
    default: 0,
  },

  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Experience', ExperienceSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ExperienceSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: 'User' },
//   title: String,
//   content: String,
//   spiritualities: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Spirituality',
//   }],
//   techniques: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Technique',
//   }],
//   tags: [String], 
//   date: Date,
//   likes: { type: Number, default: 0 },
//   likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
// });

// module.exports = mongoose.model('Experience', ExperienceSchema);