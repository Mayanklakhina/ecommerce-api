const router = require('express').Router();
const {updateUser, deleteUser, getUsers, getUser} = require('../controllers/user')
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../routes/verifyToken');

// for updating user details
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// for deleting a user
router.delete(':/id', verifyTokenAndAuthorization, deleteUser);

// for fetching the user (only admin can do)
router.get('/find/:id', verifyTokenAndAdmin, getUser);

// for fetching all the users
router.get('/', verifyTokenAndAdmin, getUsers);

module.exports = router;