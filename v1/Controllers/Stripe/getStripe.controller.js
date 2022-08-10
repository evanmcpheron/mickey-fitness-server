import { error, success } from '../../Utils/responseAPI.util'

const stripe = require('stripe')(process.env.STRIPE_SK)

export default {
  cards: async (req, res) => {
    if (!req.currentUser) {
      return res
        .status(401)
        .send(error('You must be logged in to see cards', res.statusCode, {}))
    }
    try {
      const cards = await stripe.customers.listSources(
        req.currentUser.data.customerId,
        {
          object: 'card',
        }
      )

      res
        .status(200)
        .send(success('Available Cards on file', res.statusCode, cards.data))
    } catch (err) {
      res.status(500).send(error('Something went wrong', res.statusCode, err))
    }
  },
}
