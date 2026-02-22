const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  favoritedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // Nodes = The elements added to this web (Authors, Quotes, Books, Techniques, etc.)
  nodes: [{
    refModel: { type: String, enum: ['Author', 'Quote', 'Book', 'Experience', 'Technique'], required: true },
    refId: { type: Schema.Types.ObjectId, required: true, refPath: 'nodes.refModel' },
    _id: false  // Prevents duplicate subdocument IDs
  }],

  // Direct associations between specific nodes within this web (optional)
  associations: [{
    relatedNodes: [{ type: Schema.Types.ObjectId, required: true }], // Can include 2+ nodes
    resonance: { type: String }, // No longer required
    _id: false  // Prevents duplicate subdocument IDs
  }]
});

// Ensure unique associations between relatedNodes
WebSchema.index(
  { '_id': 1, 'associations.relatedNodes': 1 },
  { unique: true }
);

// Ensure each node is unique within a web
WebSchema.index(
  { '_id': 1, 'nodes.refModel': 1, 'nodes.refId': 1 },
  { unique: true }
);


module.exports = mongoose.model('Web', WebSchema);
