import mongoose from 'mongoose'
import { Password } from '../Services/Password.service'

const UserSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    data: {
      displayName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: false,
      },
      location: {
        type: String,
        default: '',
      },
      photoURL: {
        type: String,
        default: 'default-profile.jpg',
        required: true,
      },
      coverPhoto: {
        type: String,
        default: 'default-cover-photo.png',
      },
      customerId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.uuid = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

export const User = mongoose.model('user', UserSchema)
