const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('slugs')
mongoose.Promise = global.Promise

// Sub document for fields in the interface
const fieldSchema = new Schema(
  {
    label: {
      type: String,
      trim: true
    }
  },
  { discriminatorKey: 'kind', _id: false }
)

// Field discriminators
const numberFieldSchema = new Schema(
  {
    startValue: {
      type: Number
    }
  },
  { _id: false }
)
const stringFieldSchema = new Schema(
  {
    startValue: {
      type: String
    }
  },
  { _id: false }
)

// Main document
const interfaceSchema = new Schema({
  author: {
    // to be changed to ref after making User model
    type: String,
    trim: true,
    required: 'Interface author is required.'
  },
  name: {
    type: String,
    trim: true,
    required: 'Interface name is required.'
  },
  for: {
    type: String,
    trim: true
  },
  layout: [[fieldSchema]],
  slug: String
})

interfaceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slug(this.name)
  }
  next()
  // TODO make more resilient so slugs are unique
})

// Connecting discriminators
interfaceSchema.path('layout').caster.discriminator('Number', numberFieldSchema)
interfaceSchema.path('layout').caster.discriminator('String', stringFieldSchema)

module.exports = mongoose.model('Interface', interfaceSchema)
