const Movie = require('../models/movies');
const readline = require('readline');
const fs = require('fs');

module.exports.getAll = async function (req, res) {
    try {
        const movies = await Movie
            .find()
        res.status(200).json(movies);

    } catch (e) {
        console.log(e);
    }
}

module.exports.getById = async function (req, res) {
    try {
        const movies = await Movie.findById(req.params.id)
        res.status(200).json(movies);
    } catch (e) {
        console.log(e);
    }
}

module.exports.importMovie = async function (req, res) {
    const arr = [];
    var getFile = (filename, callback) => {
        var columns = [],
            x = 0,
            lineReader = readline.createInterface({
                input: fs.createReadStream(filename)
            });

        lineReader.on('line', function (line) {
            columns[x] = {};
            columns[x].data = line.split(" ");
            x++;
        }).on('close', () => {
            callback(columns);
        });
    };

// usage
    getFile(req.file.path, (columns) => {
        console.log(columns)
    })
    const movies = new Movie({});
    try {
        await movies.save()
        res.status(201).json(movies);
    } catch (e) {
        console.log(e);
    }
}