const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		productImage: {
			type: String,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Products = mongoose.model('Products', productSchema);
module.exports = Products;
