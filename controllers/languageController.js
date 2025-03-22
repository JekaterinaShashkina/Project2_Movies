const db = require('../config/database') 

const initModels = require("../models/init-models")  

const models = initModels(db)  

// Get all languages 
exports.getAllLanguages = async (req, res) => {   
    try {     
        const languages = await models.language.findAll()      
        res.status(200).json(languages)    
    } catch (error) {     
        console.error(error)      
        res
        .status(500)
        .json({ message: 'An error occurred while fetching languages' })    
    } 
}  

// Create a new movie category 
exports.createLanguage = async (req, res) => {   
    const { name } = req.body    
    try {     
        const language = await models.language.create({ name, last_update: new Date()  })      
        res.status(201).json(language)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while adding a language' })    
    } 
}

// Get language information by ID 
exports.getLanguageById = async (req, res) => {   
    const { id } = req.params    
    try {     
        const language = await models.language.findByPk(id)      
        if (!language) {       
            return res.status(404).json({ message: `Language with ${id} not found` })      
        }     
        res.status(200).json(language)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while fetching language information' })    
    } 
    }  

// Update language information 
exports.updateLanguage = async (req, res) => {   
    const { id } = req.params    
    const { name } = req.body    
    try {     
        const language = await models.language.findByPk(id)      
        if (!language) {       
            return res.status(404).json({ message: 'Movie language not found' })      
        }     await language.update({ name, last_update: new Date() })      
        res.status(200).json(language)    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while updating movie language' })    
    } }   
    
// Delete a movie language 
exports.deleteLanguage = async (req, res) => {   
    const { id } = req.params    
    try {     
        const language = await models.language.findByPk(id)      
        if (!language) {       
            return res.status(404).json({ message: 'Movie language not found' })      
        }     
        await language.destroy()      
        res.status(204).json()    
    } catch (error) {     
        console.error(error)      
        res.status(500).json({ message: 'An error occurred while deleting movie language' })    
    } 
} 