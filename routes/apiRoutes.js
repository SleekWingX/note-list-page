const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// GET route to fetch all notes
router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read data file." });
        }
        res.json(JSON.parse(data));
    });
});

// Create a new note
router.post('/notes', (req, res) => {
    const newNote = { id: uuidv4(), ...req.body };
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to read data file." });
        }
        let notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).json({ error: "Failed to write data file." });
            }
            res.json(newNote);
        });
    });
});

// Bonus: Delete a note
router.delete('/api/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
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
