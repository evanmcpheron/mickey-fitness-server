import express from 'express'

module.exports = () => {
  const router = express.Router()

  // @route    GET /v1/review/
  // @desc
  // @access   Public
  // router.get('/', async (req, res) => await reviewRoute.get)

  return router
}
