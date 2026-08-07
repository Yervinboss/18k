const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const musicDir = path.join(__dirname, '../music');
    fs.readdir(musicDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Errore lettura cartella" });
        }
        const songs = files.filter(file => file.endsWith('.mp3'));
        res.json(songs);
    });
});

module.exports = router;