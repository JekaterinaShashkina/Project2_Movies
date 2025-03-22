const express = require('express') 
const router = express.Router() 
const movieController = require('../controllers/movieController') 

// GET all movies 
router.get('/', movieController.getAllMovies) 
// GET movie by ID 
router.get('/:id', movieController.getMovieById) 
// POST movie
router.post('/', movieController.createMovie)
// PUT movie
router.put('/:id', movieController.updateMovie)
// DELETE movie
router.delete('/:id', movieController.deleteMovie)

module.exports = router 