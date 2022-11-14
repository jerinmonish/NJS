var express = require('express');
var router = express.Router();

const { listAllCategories, listDropDownAllCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/category');

router.get('/category/categories', listAllCategories);
router.get('/category/dp-categories', listDropDownAllCategories);
router.post('/category/create', createCategory);
router.get('/category/category/:categoryId', getCategoryById);
router.put('/category/update/:categoryId', updateCategoryById);
router.delete('/category/delete/:categoryId', deleteCategoryById);

module.exports = router;