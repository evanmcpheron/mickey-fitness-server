import get from './getStripe.controller'
import post from './postStripe.controller'
import update from './updateStripe.controller'
import remove from './deleteStripe.controller'

export const stripeRoute = {
  get,
  post,
  update,
  remove,
}
