const db = require('../config/database') 

const initModels = require("../models/init-models")  

const models = initModels(db)   

// Get all actors with pagination
exports.getAllActors = async (req, res) => {   
    try {  
        let { page = 1, limit = 10, sortBy="actor_id", order="asc" } = req.query;

        const allowedSortFields = ["first_name", "last_name", "actor_id"]
        if (!allowedSortFields.includes(sortBy)) sortBy="actor_id"
        order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
        
        page = Math.max(parseInt(page), 1);
        limit = Math.max(parseInt(limit), 1);
        const offset = (page - 1) * limit;

        const { count, rows: actors }= await models.actor.findAndCountAll({
            limit,
            offset,
            order: [[sortBy, order]],
            attributes: ['actor_id', 'first_name', 'last_name']
        })  

        res.status(200).json({
            totalActors: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            actors
        })    

    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching actors' })    
    } }  

// GET actor by ID
exports.getActorById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const actor = await models.actor.findByPk(id)      
        if (!actor) {       
            return res.status(404).json({ message: `Actor with ID ${id} not found` })      
        }     
        res.status(200).json(actor)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching actor information' })    
    } 
    }  

// POST new actor
exports.createActor = async (req, res) => {   
    const { first_name, last_name } = req.body    
    try {     
        const actor = await models.actor.create({ 
            first_name,
            last_name,
            last_update: new Date() 
        })      
        res.status(201).json(actor)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while creating a new actor' })    
    } }

// Update movie category information 
exports.updateActor = async (req, res) => {   
    const { id } = req.params    
    const { first_name, last_name } = req.body    
    try {     
        const actor = await models.actor.findByPk(id)      
        if (!actor) {       
            return res.status(404).json({ message: 'Actor not found' })      
        }     await actor.update ({ 
                first_name, 
                last_name, 
                last_update: new Date() 
        })      
        res.status(200).json(actor)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while updating actor' })    
    } }  

// DELETE actor
exports.deleteActor = async (req, res) => {   
    const { id } = req.params    
    try {     
        const actor = await models.actor.findByPk(id)      
        if (!actor) {       
            return res.status(404).json({ message: 'Actor is not found' })      
        }     
        await actor.destroy()      
        res.status(204).json()    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while deleting actor' })    
    } 
} 