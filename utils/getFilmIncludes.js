const db = require('../config/database') 

const initModels = require("../models/init-models")  

const models = initModels(db)

const getFilmIncludes = () => [
    {
        model: models.category,  
        as: "category_id_categories",  
        attributes: ['category_id', 'name'],
        through: { attributes: [] } 
    },
    {
        model: models.actor, 
        as: "actor_id_actors",  
        attributes: ['actor_id', 'first_name', 'last_name'],
        through: { attributes: [] } 
    }
];

module.exports = getFilmIncludes;