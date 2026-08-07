document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const songList = document.getElementById('song-list');
    const currentTitle = document.getElementById('current-title');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');

    function loadSongs() {
        songList.innerHTML = '';
        fetch('/api/songs')
            .then(res => res.json())
            .then(songs => {
                if (songs.length === 0) {
                    currentTitle.innerText = "Nessun file MP3 trovato!";
                    return;
                }
                songs.forEach(song => {
                    const li = document.createElement('li');
                    li.innerText = song;
                    li.addEventListener('click', () => {
                        audioPlayer.src = `/music/${encodeURIComponent(song)}`;
                        audioPlayer.play();
                        currentTitle.innerText = `In riproduzione: ${song}`;
                    });
                    songList.appendChild(li);
                });
            });
    }

    // Gestione dell'invio del file
    uploadBtn.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) {
            alert("Seleziona prima un file MP3!");
            return;
        }

        const formData = new FormData();
        formData.append('songFile', file);

        currentTitle.innerText = "Caricamento in corso...";

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Caricato con successo!");
                fileInput.value = '';
                loadSongs(); // Ricarica la playlist automaticamente
            } else {
                alert("Errore durante il caricamento.");
            }
        })
        .catch(err => {
            alert("Errore di connessione.");
        });
    });

    loadSongs();
});