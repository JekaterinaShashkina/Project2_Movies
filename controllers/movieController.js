const db = require('../config/database') 
const getFilmIncludes = require('../utils/getFilmIncludes')
const actor = require('../models/actor')

const initModels = require("../models/init-models")  

const models = initModels(db)  

// Get all movies with pagination
exports.getAllMovies = async (req, res) => {   
    try { 
        let { page = 1, limit = 10, sortBy = "film_id", order = "asc" } = req.query;
        
        const allowedSortFields = ['title', 'release_year', 'rating', 'film_id'];
        if (!allowedSortFields.includes(sortBy)) sortBy = 'film_id';

        order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        page = Math.max(parseInt(page), 1);
        limit = Math.max(parseInt(limit), 1);
        const offset = (page - 1) * limit;
        
        const { count, rows: films} = await models.film.findAndCountAll({
            limit,
            offset,
            order: [[sortBy, order]],
            include: getFilmIncludes(),
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id', "rating"]
        })      
        res.status(200).json({
            totalFilms: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            films
        })    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching films' })    
    } 
}  

// GET movie by ID
exports.getMovieById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const film = await models.film.findByPk(id, {
            include: getFilmIncludes(),
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id']
        })      
        if (!film) {       
            return res.status(404).json({ message: `Movie with ${id} not found` })      
        }     
        res.status(200).json(film)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching movie information' })    
    } 
}  

// Create a new movie
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

// Update movie info
exports.updateMovie = async (req, res) => {   
    const { id } = req.params    
    const { title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, fulltext, category, actors } = req.body    
    try {     
        const film = await models.film.findByPk(id)      
        if (!film) {       
            return res.status(404).json({ message: 'Movie not found' })      
        }     
        await film.update({ 
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
        if (category && Array.isArray(category)) {
            await models.film_category.destroy({ where: { film_id: id } }); // old cats deleting
            const categoryEntries = category.map(catId => ({
                film_id: id,
                category_id: catId,
                last_update: new Date()
            }));
            await models.film_category.bulkCreate(categoryEntries);
            console.log('Categories updated', categoryEntries);
        }
        if (actors && Array.isArray(actors)) {
            await models.film_actor.destroy({ where: { film_id: id } }); // old actors deleting
            const actorEntries = actors.map(actorId => ({
                film_id: id,
                actor_id: actorId,
                last_update: new Date()
            }));
            await models.film_actor.bulkCreate(actorEntries);
            console.log('Actors updated:', actorEntries);
        } 
        res.status(200).json({ message: "Film succesfully updated", film})    
    } catch (error) {     
        console.error("Error updating", error)      
        res.status(500).json({ message: 'An error occurred while updating movie' })    
    } }  

// DELETE movie
exports.deleteMovie = async (req, res) => {   
    const { id } = req.params    
    try {     
        const film = await models.film.findByPk(id)      
        if (!film) {       
            return res.status(404).json({ message: 'Movie not found' })      
        } 
        await models.film_category.destroy({ where: { film_id: id } });
        
        await models.film_actor.destroy({ where: { film_id: id } });
        
        await film.destroy()      
        res.status(204).json()    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while deleting movie category' })    
    } 
}