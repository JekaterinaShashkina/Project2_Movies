const express = require('express') 
const router = express.Router() 
const authController = require('../controllers/authController') 

// POST user register
router.post('/register', authController.register)
// POST user login
router.post('/login', authController.login)

module.exports = router 