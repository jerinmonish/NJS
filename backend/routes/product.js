var express = require('express');
var router = express.Router();
var helper = require('../helpers/helper');

const { listAllProducts, createProduct, getProductById, updateProductById, deleteProductById, listAllProductsBasedOnCategories, getProductByIdFrontend, dummyProductId, getProductForBuyNow } = require('../controllers/productController');

router.get('/product/products', listAllProducts);
router.post('/product/create', /*helper.AuthenticateHrmsBearerToken,*/ createProduct);
router.get('/product/product/:id', helper.AuthenticateHrmsBearerToken, getProductById);
router.put('/product/update/:id', helper.AuthenticateHrmsBearerToken, updateProductById);
// router.post('/product/update/:id', updateProductById);
router.delete('/product/delete/:id', helper.AuthenticateHrmsBearerToken, deleteProductById);
router.get('/product/category-by-product', helper.AuthenticateHrmsBearerToken, listAllProductsBasedOnCategories);
router.get('/product/products/:id', getProductByIdFrontend);
router.get('/product/cat-based-products/:id', dummyProductId);
router.get('/product/buy-now-product-id/:id', getProductForBuyNow);

module.exports = router;