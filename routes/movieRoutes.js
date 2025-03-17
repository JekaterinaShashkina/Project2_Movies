const express = require('express') 
const router = express.Router() 
const movieController = require('../controllers/movieController') 

// GET all movies 
router.get('/movies', movieController.getAllMovies) 
// GET movie by ID 
router.get('/movies/:id', movieController.getMovieById) 
// POST movie
router.post('/movies/', movieController.createMovie)

module.exports = router 