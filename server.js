const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/music', express.static(path.join(__dirname, 'music')));

const songsRouter = require('./routes/songs');
app.use('/api/songs', songsRouter);

app.listen(PORT, () => {
    console.log(`Server 18K Music attivo su http://localhost:${PORT}`);
});