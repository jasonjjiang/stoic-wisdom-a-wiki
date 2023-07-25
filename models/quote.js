const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const thoughtsSchema = new Schema({
  thoughts: {
    type: String,
    required: true
  },
  wisdom: {
    type: Number,
    min: 1,
    max: 10
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const quoteSchema = new Schema({
  quote: { type: String, required: true },
philosopher: { type: String, required: true },
  }, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Quote', quoteSchema);