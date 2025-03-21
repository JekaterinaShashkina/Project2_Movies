const express = require('express') 
const router = express.Router() 
const searchController = require('../controllers/searchController') 

// GET search film by name
router.get('/movies/:title', searchController.searchMoviesByTitle) 

// GET search films by actor
router.get('/actor/:actor', searchController.searchMoviesByActor)

// GET search films by language id
router.get('/language/:language_id', searchController.searchMoviesByLanguage)

// GET search films by category
router.get('/category/:category_id', searchController.searchMoviesByCategory)

//GET film actors by film id
router.get('/actors/:film_id', searchController.getActorsByFilm)

module.exports = router 