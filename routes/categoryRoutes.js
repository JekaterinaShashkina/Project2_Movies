const express = require('express') 
const router = express.Router() 
const categoryController = require('../controllers/categoryController') 

// GET all categories 
router.get('/categories', categoryController.getAllCategories) 

// GET category by ID 
router.get('/categories/:id', categoryController.getCategoryById) 

// POST create new category 
router.post('/categories', categoryController.createCategory) 

// PUT update category by ID 
router.put('/categories/:id', categoryController.updateCategory) 

// DELETE category by ID 
router.delete('/categories/:id', categoryController.deleteCategory) 

module.exports = router 