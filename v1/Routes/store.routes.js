import express from 'express'
import { storeRoute } from '../Controllers/Store/storeIndex.controller'
import { currentUser } from '../Middlewares/current-user'

module.exports = () => {
  const router = express.Router()

  // @route    GET /v1/store/me
  // @desc     gets my store
  // @access   Public
  router.post(
    '/',
    currentUser,
    async (req, res) => await storeRoute.post.new(req, res)
  )

  // @route    GET /v1/store/me
  // @desc     gets my store
  // @access   Public
  router.get(
    '/:userId',
    currentUser,
    async (req, res) => await storeRoute.get.store(req, res)
  )

  return router
}
