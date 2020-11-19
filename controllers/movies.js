const Movie = require('../models/movies');

module.exports.getAll = async function(req, res) {
    try {
        const movies = await Movie
            .find()
        res.status(200).json(movies);

    } catch (e) {
        console.log(e);
    }
}

module.exports.getById = async function(req, res) {
    try {
        const movies = await Movie.findById(req.params.id)
        res.status(200).json(movies);
    } catch (e) {
        console.log(e);
    }
}