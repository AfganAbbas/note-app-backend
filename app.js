const express = require('express');
const todoController = require('./controllers/noteController');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/todos', todoController);

module.exports = app;