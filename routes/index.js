const express = require('express');
const router = express.Router();


// Routing
router.use('/products',  require('./products'));
router.use('/orders', require('./orders'));

// Error handling here we have custom error message
router.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

router.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = router;
