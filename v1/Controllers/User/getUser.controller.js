import { error, success } from '../../Utils/responseAPI.util'


export default {
  me: async (req, res) => {
    if (!req.currentUser) {
      return res.status(401).send(
        error('', res.statusCode, {
          role: '',
          id: '',
          data: {
            displayName: 'Guest',
            photoURL: 'assets/images/avatars/brian-hughes.jpg',
            email: '',
          },
        })
      )
    }
    res.status(200).send(success('', res.statusCode, req.currentUser))
  }
}
