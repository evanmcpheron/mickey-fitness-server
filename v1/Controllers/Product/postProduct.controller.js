import { success } from '../../Utils/responseAPI.util'
import { Product } from '../../Models/Product.model'

module.exports = {
  new: async (req, res) => {
    const { title, description, price, tags } = req.body
    const { storeId } = req.params

    const product = await new Product({
      title,
      description,
      price,
      tags,
      storeId,
    })

    await product.save()

    res
      .status(200)
      .send(success('A new product has been saved', res.statusCode, product))
  },
}
