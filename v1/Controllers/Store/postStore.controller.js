import { error, success } from '../../Utils/responseAPI.util';
import { Store }  from '../../Models/Store.model';
import { User } from '../../Models/User.model';

module.exports = {
	new: async (req, res) => {
		const {name, about, specialties, certifications} = req.body;
		if(req.currentUser.data.store) {
			return res.status(400).send(error('This user already has a store', res.statusCode, {}));
		}
		const store = await new Store({
			name, about, specialties, certifications
		})
		await store.save();
		await User.findByIdAndUpdate(req.currentUser._id, {'data.store': store._id});
		res.status(200).send(success('New store created', res.status, store));
	}
};
