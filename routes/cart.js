const router = require('express').Router();
const {deleteCart, updateCart, createCart, getUserCart, getAllCart} = require('../controllers/cart')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../routes/verifyToken');

router.post('/', verifyToken, createCart);

router.put("/:id", verifyTokenAndAuthorization, updateCart);

router.delete('/:id', verifyTokenAndAuthorization, deleteCart);

router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);

router.get('/', verifyTokenAndAdmin, getAllCart)


module.exports = router;