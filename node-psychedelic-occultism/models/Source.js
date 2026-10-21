const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { generateSlug } = require('../middleware/slugMiddleware');

const SourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
  },

  description: String,

  type: {
    type: String,
    enum: [
    'Book',
    'Sacred Text',
    'Article',
    'Website',
    'Talk',
    'Podcast',
    'Video',
    'Other',
  ],
    required: true,
  },

  image: String,

  people: [{
    type: Schema.Types.ObjectId,
    ref: 'Person',
  }],

  // quotes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Quote',
  // }],
  spiritualities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spirituality',    
  }],

  publicationDate: Date,
  
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],

  likes: {
    type: Number,
    default: 0,
  },

  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

generateSlug(SourceSchema);

const Source = mongoose.model('Source', SourceSchema);

module.exports = Source;
