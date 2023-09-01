import express from 'express'
import { stripeRoute } from '../Controllers/Stripe/stripeIndex.controller'

module.exports = () => {
  const router = express.Router()

  // @route    GET /v1/stripe/card
  // @desc     gets all of a users card
  // @access   Public
  router.get(
    '/cards',
    async (req, res) => await stripeRoute.get.cards(req, res)
  )

  return router
}
