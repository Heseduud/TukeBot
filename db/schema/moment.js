const mongoose = require('mongoose');

module.exports = mongoose.model('moment', new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: { type: String },
  date: { type: Date, default: Date.now }
}));
