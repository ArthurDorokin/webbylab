const Movie = require('../models/movies');
const readline = require('readline');
const fs = require('fs');
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const movies = await Movie
            .find()
        res.status(200).json(movies);

    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const movies = await Movie.findById(req.params.id)
        res.status(200).json(movies);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.importMovie = async function (req, res) {
    if (req.file) {
        function convert(file) {

            return new Promise((resolve, reject) => {

                const stream = fs.createReadStream(file);
                stream.on('error', reject);

                const reader = readline.createInterface({
                    input: stream
                });

                let array = [];

                reader.on('line', line => {
                        if (line.startsWith('Title:')) {
                            array.push(line.split('Title:'))
                        }
                        if (line.startsWith('Release Year:')) {
                            array.push(line.split('Release Year:'))
                        }
                        if (line.startsWith('Format:')) {
                            array.push(line.split('Format:'))
                        }
                        if (line.startsWith('Stars:')) {
                            array.push(line.split('Stars:'))
                        }
                });

                reader.on('close', () => resolve(array));
            });
        }

        try {
            convert(req.file.path)
                .then(resp => {
                    for (let i = 0; i <= resp.length - 1; i += 4) {
                        if (resp[i] && resp[i+1] && resp[i+2] && resp[i+3]) {
                            if (resp[i][1] && resp[i + 1][1] && resp[i + 2][1] && resp[i + 3][1]) {
                                const movies = new Movie({
                                    Title: resp[i][1],
                                    ReleaseYear: resp[i + 1][1],
                                    Format: resp[i + 2][1],
                                    Stars: resp[i + 3][1],
                                    id: Math.floor(i + Math.random() * (15000 - 100 - i) + 100 - i)
                                });
                                movies.save()
                            } else {
                                errorHandler(res, 'Please fill all required fields in file!');
                            }
                        } else {
                            errorHandler(res, 'Please add all fields for each movie to the file!')
                        }
                    }
                })
                .catch(err => errorHandler(res, err));
            const movies = await Movie
                .find()
            res.status(201).json(movies);
        } catch (e) {
            errorHandler(res, e);
        }
    } else {
        errorHandler(res, 'Please select file!');
    }
}

module.exports.deleteMovie = async function (req, res) {
    try {
        await Movie.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Selected movie deleted!'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.addMovie = async function (req, res) {
    if (req.body.Title && req.body.ReleaseYear && req.body.Format && req.body.Stars) {
        const movie = new Movie({
            Title: req.body.Title,
            ReleaseYear: req.body.ReleaseYear,
            Format: req.body.Format,
            Stars: req.body.Stars,
            id: Math.floor(Math.random() * (15000 - 100) + 100 - 6)
        });
    try {
        await movie.save();
        res.status(201).json(movie)
    } catch (e) {
        errorHandler(res, e)
    }
    } else {
        errorHandler(res, 'Please specify all fields for movie!')
    }
}