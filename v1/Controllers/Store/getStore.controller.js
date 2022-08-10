import { error, success } from '../../Utils/responseAPI.util'
import { Store } from '../../Models/Store.model'

module.exports = {
  store: async (req, res) => {
    const { userId } = req.params

    if (!req.currentUser) {
      return res
        .status(403)
        .send(
          error('You must be logged in for this to work.', res.statusCode, {})
        )
    }

    const id = userId === 'me' ? req.currentUser._id : userId
    const store = await Store.findOne({ userId: id })

    if (!store) {
      return res
        .status(200)
        .send(success('There is no store to be found.', res.statusCode, {}))
    }
    res
      .status(200)
      .send(success('Your store was found.', req.statusCode, store))
  },
}
