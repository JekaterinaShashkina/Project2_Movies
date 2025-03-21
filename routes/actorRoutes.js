const express = require('express') 
const router = express.Router() 
const actorController = require('../controllers/actorController') 

// GET all actors 
router.get('/actors', actorController.getAllActors) 
// GET actor by ID 
router.get('/actors/:id', actorController.getActorById) 
// POST new actor
router.post('/actors', actorController.createActor)
// PUT actor
router.put('/actors/:id', actorController.updateActor)
// DELETE actor
router.delete('/actors/:id', actorController.deleteActor)

module.exports = router 