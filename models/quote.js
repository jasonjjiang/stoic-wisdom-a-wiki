const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const thoughtsSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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
  title: { type: String, required: true },
  year: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: -1000
  },
philosopher: { type: String, required: true },
  }, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Quote', quoteSchema);