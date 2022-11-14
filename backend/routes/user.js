var express = require('express');
var router = express.Router();

const { createUser, userLogin, userProfileUpdate, updateWishList } = require('../controllers/userController');

router.post('/user/create', createUser);
router.post('/user/login', userLogin);
router.put('/user/update-profile/:id', userProfileUpdate);
router.put('/user/update-wishlist', updateWishList);

module.exports = router;