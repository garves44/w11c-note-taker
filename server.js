// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const {
    get
} = require('http');
const {
    send
} = require('process');
const app = express();

//Port being used
let PORT = process.env.PORT || 3001

//Globals
let notes = [];

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
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
    let {
        body
    } = req;
    if (body === undefined) {
        res.send(`Body is undefined!`);
        return;
    }
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        let db = JSON.parse(data);
        body.id = db.length;
        db.push(body);
        fs.writeFile('./db/db.json', JSON.stringify(db), err => {
            if (!err) {
                res.send('ok');
            } else {
                throw err;
            }

        });
    });
});

//BONUS DELETE route for "/api/notes/:id"
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        let db = JSON.parse(data);
        db.splice(req.params.id, 1)
        fs.writeFile('./db/db.json', JSON.stringify(db), err => {
            if (!err) {
                res.send('ok');
            } else {
                throw err;
            }
        });
    });
});

// CATCH ALL ROUTE using * to redirect everything else to "/"
app.get('*', (req, res) => {
    res.redirect('/');
});