const mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
  id: { type: String },
  kouluCount: { type: Number }
}));
