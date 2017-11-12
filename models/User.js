const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const userSchema = new Schema({
  displayName: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  authored: [{ type: mongoose.Schema.ObjectId, ref: 'Interface' }],
  favourites: [{ type: mongoose.Schema.ObjectId, ref: 'Interface' }]
})

module.exports = mongoose.model('User', userSchema)
