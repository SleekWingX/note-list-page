const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

// Get all notes
router.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// Create a new note
router.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 4), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// Bonus: Delete a note
router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 4), (err) => {
            if (err) throw err;
            res.json({ msg: 'Note deleted' });
        });
    });
});

module.exports = router;
