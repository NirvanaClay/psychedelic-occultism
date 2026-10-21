const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },

  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
  },

  source: {
    type: Schema.Types.ObjectId,
    ref: 'Source',
  },

  spiritualities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Spirituality',
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

module.exports = mongoose.model('Quote', QuoteSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const QuoteSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   person: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Person',
//   },
//   source: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Source',
//   },
//   spirituality: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Spirituality',
//   }],
//   likes: { type: Number, default: 0 },
//   likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// });

// module.exports = mongoose.model('Quote', QuoteSchema);

