const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');
const db = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.post('/api/notes', (req, res) => {
    req.body.id = nanoid();
    db.push(req.body);

    res.json(db);
})

app.delete('/api/notes/:id', (req, res) => {
    const noteIndex = db.indexOf(req.params.id);
    if(noteIndex === -1) {
        res.status(400).json({ message: `the note with the id of ${req.params.id} could not be found`});
    }
    let filtered = db.filter(arr => {arr.id !== noteIndex})
    res.json(db);
})

app.listen(PORT, () => {
    console.log(`Note Taker listening on http://localhost:${PORT}`);
})