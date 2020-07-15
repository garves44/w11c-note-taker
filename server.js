// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const { send } = require('process');
const app = express();

//Port being used
let PORT = process.env.PORT || 3001

//Globals
let notes = [];

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//App listener
app.listen(PORT, (req, res) => {
    console.log(`App listening to port: ${PORT}`);
});

// GET route for "/notes"
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET route for "/api/routes"
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

// GET route for "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// POST route for "/api/notes"
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.js', JSON.stringify(db), (err) => {
        if(!err){
            res.send('ok');
        }
        throw err;
    });
});

//BONUS DELETE route for "/api/notes/:id"



