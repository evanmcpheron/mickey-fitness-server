const mongoose = require('mongoose')

const {Schema} = mongoose

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mainPhoto: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  downloads: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  photos: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
  storeId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const Product = mongoose.model('product', productSchema)
