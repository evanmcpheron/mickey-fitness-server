import express from 'express'
import { stripeRoute } from '../Controllers/Stripe/stripeIndex.controller'
import { currentUser } from '../Middlewares/current-user'

module.exports = () => {
  const router = express.Router()

  // @route    GET /v1/stripe/card
  // @desc     gets all of a users card
  // @access   Public
  router.get(
    '/cards',
    currentUser,
    async (req, res) => await stripeRoute.get.cards(req, res)
  )

  return router
}
