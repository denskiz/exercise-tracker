const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  username: { type: String, unique: true }
});

const ModelClass = mongoose.model('User', userSchema);
module.exports = ModelClass;
