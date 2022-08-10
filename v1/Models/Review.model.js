const mongoose = require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    default: 5,
  },
  description: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const Review = mongoose.model('review', reviewSchema)
