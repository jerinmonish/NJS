var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper');

const { myCartItems, createCart, deleteCartById, cardPayment, cartByBookingId, cardSingleProductPayment } = require('../controllers/CartController');

router.get('/cart/my-cart/:id', myCartItems);
router.post('/cart/create', helper.AuthenticateHrmsBearerToken, createCart);
router.post('/create/card/payment', helper.AuthenticateHrmsBearerToken, cardPayment);
router.post('/create/single-product-card/payment', helper.AuthenticateHrmsBearerToken, cardSingleProductPayment);
router.delete('/cart/delete/:id', helper.AuthenticateHrmsBearerToken, deleteCartById);
router.get('/cart/purchased/:id', cartByBookingId);

module.exports = router;