const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	// reject file which we don't want to add
	if (
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(new Error('File type mismatched please select JPEG || JPEG || PNG '), false);
	}
};

// const uploads = multer({ dest: 'uploads/' });
const uploads = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 10, // 10MB
	},
	fileFilter: fileFilter,
});

// importing controllers
const productsController = require('../controllers/products_controller');

router.post(
	'/createProduct',
	uploads.single('productImage'),
	productsController.createProduct
);

router.get('/allProducts', productsController.allProducts);

router.get('/getProduct/:id', productsController.getProduct);

router.delete('/deleteProduct/:id', productsController.deleteProduct);

router.patch('/updateProduct/:id', uploads.single('productImage'),productsController.updateProduct);

module.exports = router;
