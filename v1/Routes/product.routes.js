import express from 'express'
import { productRoute } from '../Controllers/Product/productIndex.controller'

module.exports = () => {
  const router = express.Router()

  // @route    POST /v1/product/
  // @desc     Creates a product for a store
  // @access   Private
  router.post(
    '/:storeId',
    async (req, res) => await productRoute.post.new(req, res)
  )

  // @route    GET /v1/product/
  // @desc     Get all products
  // @access   Public
  router.get('/', async (req, res) => await productRoute.get.all(req, res))

  // @route    GET /v1/product/:storeId
  // @desc     Get all products
  // @access   Public
  router.get(
    '/:storeId',
    async (req, res) => await productRoute.get.byStore(req, res)
  )

  // @route    GET /v1/product/one/:productId
  // @desc     Get specific product
  // @access   Public
  router.get(
    '/one/:productId',
    async (req, res) => await productRoute.get.oneProduct(req, res)
  )

  return router
}
