const router = require('express').Router();
const {deleteProduct, updateProduct, createProduct, getProduct, getProducts} = require('../controllers/product')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../routes/verifyToken');

// for creating a product
router.post('/', verifyTokenAndAdmin, createProduct)

// for updating product details
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// for deleting a product
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);

// for getting a specific product
router.get('/find/:id', verifyTokenAndAuthorization, getProduct);

// for fetching all the products with querying with categories
router.get('/', verifyTokenAndAuthorization, getProducts);

module.exports = router;