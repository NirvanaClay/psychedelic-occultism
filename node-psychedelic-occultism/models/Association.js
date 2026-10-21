const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entityTypes = [
  'Experience',
  'Person',
  'Source',
  'Quote',
  'Technique',
  'Spirituality',
  'Concept',
];

const entitySchema = new Schema({
  refModel: {
    type: String,
    enum: entityTypes,
    required: true,
  },
  refId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { _id: false });

const AssociationSchema = new Schema({
  entityA: {
    type: entitySchema,
    required: true,
  },

  entityB: {
    type: entitySchema,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

// Prevent duplicate relationships for the same user
AssociationSchema.index(
  {
    createdBy: 1,
    'entityA.refModel': 1,
    'entityA.refId': 1,
    'entityB.refModel': 1,
    'entityB.refId': 1,
  },
  { unique: true }
);

module.exports = mongoose.model('Association', AssociationSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const AssociationSchema = new Schema({
//   subject: {
//     refModel: {
//       type: String,
//       enum: [
//         'Experience',
//         'Person',
//         'Source',
//         'Quote',
//         'Technique',
//         'Spirituality',
//         'Concept'
//       ],
//       required: true,
//     },

//     refId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       refPath: 'subject.refModel',
//     },
//   },

//   associations: [{
//     refModel: {
//       type: String,
//       enum: [
//         'Experience',
//         'Person',
//         'Source',
//         'Quote',
//         'Technique',
//         'Spirituality',
//         'Concept'
//       ],
//       required: true,
//     },

//     refId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       refPath: 'associations.refModel',
//     },

//     _id: false,
//   }],

//   createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
// });

// AssociationSchema.index(
//   {
//     createdBy: 1,
//     'subject.refModel': 1,
//     'subject.refId': 1
//   },
//   { unique: true }
// );

// module.exports = mongoose.model('Association', AssociationSchema);