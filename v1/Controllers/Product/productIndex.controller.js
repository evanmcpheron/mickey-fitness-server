import get from './getProduct.controller'
import post from './postProduct.controller'
import update from './updateProduct.controller'
import remove from './deleteProduct.controller'

export const productRoute = {
  get,
  post,
  update,
  remove,
}
