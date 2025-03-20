const db = require('../config/database') 
const { Op } = require('sequelize')
const getFilmIncludes = require('../utils/getFilmIncludes')
const initModels = require("../models/init-models")  

const models = initModels(db)  

exports.searchMoviesByTitle = async (req, res) => {
    const { title } = req.params;

    try {
        if (!title) {
            return res.status(400).json({ message: 'Please enter film title' });
        }

        const films = await models.film.findAll({
            where: { title: { [Op.iLike]: `%${title}%` } },
            include: getFilmIncludes(),
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id']
        });

        if (films.length === 0) {
            return res.status(404).json({ message: `Film by name "${title}" not found` });
        }

        res.status(200).json(films);
    } catch (error) {
        console.error('Error searching film:', error);
        res.status(500).json({ message: 'Error searching film', error: error.message });
    }
}

exports.searchMoviesByActor = async (req, res) => {
    const { actor } = req.params;

    try {
        if (!actor) {
            return res.status(400).json({ message: 'Please enter name or surname of actor' });
        }

        const films = await models.film.findAll({
            include: [
                {
                    model: models.actor,
                    as: 'actor_id_actors',
                    where: {
                        [Op.or]: [
                            { first_name: { [Op.iLike]: `%${actor}%` } },
                            { last_name: { [Op.iLike]: `%${actor}%` } }
                        ]
                    },
                    attributes: ['actor_id', 'first_name', 'last_name'],
                    through: { attributes: [] }
                }
            ],
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id']
        });
        if (films.length === 0) {
            return res.status(404).json({ message: `Фильмы с актёром "${actor}" не найдены` });
        }

        res.status(200).json(films);

    } catch (error) {
        console.error('Error actor searching:', error);
        res.status(500).json({ message: 'Error actor searching', error: error.message });
    }
}

exports.searchMoviesByLanguage = async (req, res) => {
    const { language_id } = req.params

    if (!language_id) {
        return res.status(400).json({ message: 'Enter language ID' });
    }

    try {
        const films = await models.film.findAll({
            where: { language_id }, 
            include: getFilmIncludes(),
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id']
        });

        if (films.length === 0) {
            return res.status(404).json({ message: `Films with language id ${language_id} not found` });
        }

        res.status(200).json(films);
    } catch (error) {
        console.error('Error film searching by language id', error);
        res.status(500).json({ message: 'Error film searching by language id', error: error.message });
    }
}

exports.searchMoviesByCategory = async (req, res) => {
    const {category_id} = req.params

    if (!category_id) {
        return res.status(400).json({ message: "Enter the category ID"})
    }

    try {
        const films = await models.film.findAll({
            include: [
                {
                    model: models.category,
                    as: "category_id_categories",  
                    where: { category_id },
                    attributes: ['category_id', 'name'],
                    through: { attributes: [] } 
                }
            ],
            attributes: ['film_id', 'title', 'description', 'release_year', 'language_id']
        });

        if (films.length === 0) {
            return res.status(404).json({ message: `Not found films with category ID ${category_id}` });
        }

        res.status(200).json(films);
    } catch (error) {
        console.error('Error searching films by category:', error);
        res.status(500).json({ message: 'Error searching films by category', error: error.message });
    }
}