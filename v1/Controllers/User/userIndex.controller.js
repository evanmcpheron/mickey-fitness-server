import get from './getUser.controller'
import post from './postUser.controller'
import update from './updateUser.controller'
import remove from './deleteUser.controller'

export const userRoute = {
  get,
  post,
  update,
  remove,
}
