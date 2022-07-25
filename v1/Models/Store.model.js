const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	storeName: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});
export const Store = mongoose.model('Store', storeSchema);
