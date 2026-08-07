const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione di Multer per salvare i file nella cartella "music"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const musicDir = path.join(__dirname, 'music');
        if (!fs.existsSync(musicDir)) {
            fs.mkdirSync(musicDir);
        }
        cb(null, musicDir);
    },
    filename: (req, file, cb) => {
        // Mantiene il nome originale del file MP3
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'));
    }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/music', express.static(path.join(__dirname, 'music')));

// Rotta per ottenere la lista delle canzoni
const songsRouter = require('./routes/songs');
app.use('/api/songs', songsRouter);

// Nuova rota per ricevere l'upload della canzone dal sito
app.post('/api/upload', upload.single('songFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Nessun file caricato." });
    }
    res.json({ success: true, message: "Canzone caricata con successo!" });
});

app.listen(PORT, () => {
    console.log(`Server 18K Music attivo sulla porta ${PORT}`);
});