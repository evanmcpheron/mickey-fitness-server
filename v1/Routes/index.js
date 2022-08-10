const express = require('express')

const { routing } = require('../../constants')

const userRoute = require('./user.routes')
const globalRoute = require('./global.routes')
const storeRoute = require('./store.routes')
const productRoute = require('./product.routes')
const reviewRoute = require('./review.routes')
const stripeRoute = require('./stripe.routes')

module.exports = (application) => {
  const router = express.Router()

  router.use(routing.USER_ROOT, userRoute(application))
  router.use(routing.GLOBAL_ROOT, globalRoute(application))
  router.use(routing.STORE_ROOT, storeRoute(application))
  router.use(routing.PRODUCT_ROOT, productRoute(application))
  router.use(routing.REVIEW_ROOT, reviewRoute(application))
  router.use(routing.STRIPE_ROOT, stripeRoute(application))

  return router
}
