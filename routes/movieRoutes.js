const express = require('express') 
const router = express.Router() 
const movieController = require('../controllers/movieController') 

// GET all movies 
router.get('/movies', movieController.getAllMovies) 
// GET movie by ID 
router.get('/movies/:id', movieController.getMovieById) 
// POST movie
router.post('/movies/', movieController.createMovie)
// PUT movie
router.put('/movies/:id', movieController.updateMovie)
// DELETE movie
router.delete('/movies/:id', movieController.deleteMovie)

module.exports = router 