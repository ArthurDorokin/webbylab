const express = require('express');
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/movies');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


mongoose.connect('mongodb+srv://webbylab:webbylab@cluster0.ixjmi.mongodb.net/webbylab')
    .then(()=> console.log('true'))
    .catch(error => console.log(error))

app.use(require('cors')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/movies/', moviesRoutes);

module.exports = app;