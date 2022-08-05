const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	about: {
		type: String
	},
	specialties: {
		type: Array
	},
	certifications: {
		type: Array
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Store = mongoose.model('Store', storeSchema);
