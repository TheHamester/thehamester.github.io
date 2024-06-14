const songPagination = 15;
let loadedSongs = 0;
let songList = undefined;

function loadRecentObsessions() {
    fetch(getURL("json/recent_obsessions.json"))
        .then(async (res) => {
            const json = await res.json();
            songList = json.songs;
            getMoreSongs();
        })
        .catch((err) => { console.log(err) });
}

function getMoreSongs() {
    if(!songList)
        return;

    const recentObsessions = document.getElementById("recent-obsessions");
    const end = Math.min(loadedSongs + songPagination, songList.length);
    for(let i = loadedSongs; i < end; i++) {
        const newSongElement = createSongElement(songList[i]);
        recentObsessions.appendChild(newSongElement);
        loadedSongs++;
    }

    if(loadedSongs >= songList.length)
        document.getElementById("content").removeChild(document.getElementById("load-more-button"));
}

function createSongElement(song) {
    const li = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("href", song.url);
    anchor.innerHTML = song.artist + " - " + song.name;

    li.appendChild(anchor);

    if(song.description.length > 0) {
        const newI = document.createElement("i");
        newI.innerHTML = " - " + song.description;
        li.appendChild(newI);
    }

    return li;
}