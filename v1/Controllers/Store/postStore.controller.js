import { success } from '../../Utils/responseAPI.util'
import { Store } from '../../Models/Store.model'

module.exports = {
  new: async (req, res) => {
    const { name, about, specialties, certifications } = req.body
    // if() {
    // 	return res.status(400).send(error('This user already has a store', res.statusCode, {}));
    // }

    const store = await new Store({
      name,
      about,
      specialties,
      certifications,
      userId: req.currentUser._id,
    })

    await store.save()
    res.status(200).send(success('New store created', res.status, store))
  },
}
