const db = require('../config/database') 
const actor = require('../models/actor')

const initModels = require("../models/init-models")  

const models = initModels(db)  

// Get all movies
exports.getAllMovies = async (req, res) => {   
    try {     
        const films = await models.film.findAll()      
        res.status(200).json(films)    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching films' })    
    } 
}  

exports.getMovieById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const film = await models.film.findByPk(id)      
        if (!film) {       
            return res.status(404).json({ message: `Movie with ${id} not found` })      
        }     
        res.status(200).json(film)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching movie information' })    
    } 
}  

// Create a new movie category 
exports.createMovie = async (req, res) => {   
    const { title, description, release_year, language_id,rental_duration, rental_rate, length, replacement_cost, rating, fulltext, category, actors } = req.body    
    try {     
        const film = await models.film.create({ 
            title, 
            description, 
            release_year, 
            language_id, 
            rental_duration,  
            rental_rate,  
            length,  
            replacement_cost, 
            rating,
            special_features: [],
            fulltext,
            last_update: new Date()
        })

        // Add category if it is
        if (category && Array.isArray(category) && category.length > 0) {
            const categoryEntries = category.map(catId => ({
                film_id: film.film_id,
                category_id: catId,
                last_update: new Date()
            }));
            await models.film_category.bulkCreate(categoryEntries);
        }

        // Add actors if it is
        if (actors && Array.isArray(actors) && actors.length > 0) {
            const actorEntries = actors.map(actorId => ({
                film_id: film.film_id,
                actor_id: actorId,
                last_update: new Date()
            }));
            await models.film_actor.bulkCreate(actorEntries);
        }      
        res.status(201).json(film)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a movie' })    
    } }

