import { error, success } from '../../Utils/responseAPI.util'
import { Product } from '../../Models/Product.model'

export default {
  all: async (req, res) => {
    try {
      const products = await Product.find()
      console.log(
        '🚀 ~ file: getProduct.controller.js ~ line 9 ~ products: ',
        products
      )

      res
        .status(200)
        .send(success('Found all products', res.statusCode, products))
    } catch (err) {
      res.status(500).send(error('Something went wrong', res.statusCode, err))
    }
  },
  byStore: async (req, res) => {
    const { storeId } = req.params
    try {
      const products = await Product.find({ storeId })
      res
        .status(200)
        .send(
          success(
            'Found all products by store',
            res.statusCode,
            products,
            products.length
          )
        )
    } catch (err) {
      res.status(500).send(error('Something went wrong', res.statusCode, err))
    }
  },
  oneProduct: async (req, res) => {
    const { productId } = req.params
    try {
      const products = await Product.findById(productId)
      res
        .status(200)
        .send(success('Found all products by store', res.statusCode, products))
    } catch (err) {
      res.status(500).send(error('Something went wrong', res.statusCode, err))
    }
  },
}
