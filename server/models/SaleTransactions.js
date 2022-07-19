const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SaleTransactionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.ObjectId,
		required: true,
	},
	finalQuantity: {
		type: Number,
		required: true,
	},
	finalSaleAndPurchase: {
		type: Number,
		required: true,
	},
	date: {
		type: Number,
		required: true,
	},
	finalType: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	sale: {
		type: Number,
		required: true,
	},
	purchase: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	sign: {
		type: String,
		required: true,
	},
	Date: {
		type: Date,
		default: Date.now,
	},
});

// eslint-disable-next-line no-undef
module.exports = SaleTransaction = mongoose.model('saleTransactions', SaleTransactionSchema);
