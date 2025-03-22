const express = require('express') 
const router = express.Router() 
const languageController = require('../controllers/languageController') 

// GET all languages 
router.get('/language', languageController.getAllLanguages) 
// GET language by ID 
router.get('/language/:id', languageController.getLanguageById) 
// POST new language
router.post('/language', languageController.createLanguage)
// PUT language
router.put('/language/:id', languageController.updateLanguage)
// DELETE language
router.delete('/language/:id', languageController.deleteLanguage)

module.exports = router 