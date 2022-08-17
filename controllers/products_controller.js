const Products = require('../models/products');
const bcrypt = require('bcrypt');
const { response } = require('express');

module.exports.createProduct = async (req, res) => {
	try {
		await Products.create({
			name: req.body.name,
			price: req.body.price,
			productImage: req.file.path,
			description: req.body.description,
		});
		return res.status(200).json({
			success: true,
			message: 'New product has been created!',
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

module.exports.allProducts = async (req, res) => {
	try {
		const products = await Products.find();
		return res.status(200).json({
			products: products,
			success: true,
			message: 'All the products are here!',
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

module.exports.getProduct = async (req, res) => {
	try {
		const id = req.params.id;
		Products.findById(id, function (err, product) {
			if (err) {
				console.log(err);
			} else {
				return res.status(200).json({
					success: true,
					message: 'Please find the details of the product!',
					product: product,
				});
			}
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

module.exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		await Products.findByIdAndDelete(id);
		return res.status(200).json({
			success: true,
			message: 'Product has been deleted',
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const { name, price, description } = req.body;
		const productImage = req.file.path;
		// console.log(name, '------------------------------------');
		Products.findById(id, function (err, product) {
			if (err) {
				console.log(err);
				return;
			}
			if (name) {
				product.name = name;
				console.log(product.name);
			}
			if (price) {
				product.price = price;
			}
			if (description) {
				product.description = description;
			}
			if (productImage) {
				product.productImage = productImage;
			}
			return res.status(200).json({
				success: true,
				message: `product has been updated with ${id}`,
				product: product,
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal Server Error',
		});
	}
};
