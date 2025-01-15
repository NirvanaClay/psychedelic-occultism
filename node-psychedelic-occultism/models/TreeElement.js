const mongoose = require('mongoose');
const { Schema } = mongoose;

const TreeElementSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  translation: { type: String, default: '' },
});

module.exports = mongoose.model('TreeElement', TreeElementSchema);
