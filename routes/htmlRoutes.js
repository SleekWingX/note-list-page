const path = require('path');
const router = require('express').Router();

// Route to serve the notes.html file
router.get('/notes', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    } catch (err) {
        console.error('Error serving notes.html:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Default route to serve the index.html file for all other requests
router.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
        console.error('Error serving index.html:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;