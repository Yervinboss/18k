document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const songList = document.getElementById('song-list');
    const currentTitle = document.getElementById('current-title');

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
});