const express = require('express');
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/movies');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://webbylab:webbylab@cluster0.ixjmi.mongodb.net/webbylab')
    .then(()=> console.log('true'))
    .catch(error => console.log(error))

app.use(require('cors')());
app.use('/api/movies/', moviesRoutes);

module.exports = app;