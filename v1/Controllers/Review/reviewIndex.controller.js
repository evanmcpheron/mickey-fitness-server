import get from './getReview.controller'
import post from './postReview.controller'
import update from './updateReview.controller'
import remove from './deleteReview.controller'

export const reviewRoute = {
  get,
  post,
  update,
  remove,
}
