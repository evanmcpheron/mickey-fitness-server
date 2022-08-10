import { Types } from 'mongoose'
import { error, success } from '../../Utils/responseAPI.util'
import { User } from '../../Models/User.model'

const { ObjectId } = Types

export default {
  me: async (req, res) => {
    if (!req.currentUser) {
      return res.status(401).send(
        error('', res.statusCode, {
          role: '',
          uuid: '',
          data: {
            displayName: 'Guest',
            photoURL: 'assets/images/avatars/brian-hughes.jpg',
            email: '',
          },
        })
      )
    }
    res.status(200).send(success('', res.statusCode, req.currentUser))
  },
  user: async (req, res) => {
    const { id } = req.params

    if (!ObjectId.isValid(id) && id !== 'me') {
      return res
        .status(400)
        .send(error('That is not a valid user id', res.statusCode, {}))
    }
    const user = await User.findOne({
      _id: id !== 'me' ? id : req.currentUser._id,
    })

    if (!user) {
      return res
        .status(400)
        .send(error('A user was not found.', res.statusCode, user))
    }

    res.status(200).send(success('A user was found.', res.statusCode, user))
  },
}
