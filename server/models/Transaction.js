const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.ObjectId,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	commision: {
		type: Number,
		required: true,
	},
	acNo: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

// eslint-disable-next-line no-undef
module.exports = Transaction = mongoose.model('transactions', TransactionSchema);
