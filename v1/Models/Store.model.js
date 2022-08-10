const mongoose = require('mongoose')

const {Schema} = mongoose

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  specialties: [
    {
      type: String,
    },
  ],
  certifications: [
    {
      type: String,
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const Store = mongoose.model('store', storeSchema)
