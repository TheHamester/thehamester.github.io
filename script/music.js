const songPagination = 15;
let loadedSongs = 0;
let songList = undefined;
let mySongList = undefined;

function loadRecentObsessions() {
    fetch(getURL("json/recent_obsessions.json"))
        .then(async (res) => {
            const json = await res.json();
            songList = json.songs;
            getMoreSongs();
            document.getElementById("content").removeChild(document.getElementById("recent-obsessions-loader"));
            document.getElementById("load-more-button").style.display = "block";
        })
        .catch((err) => { console.log(err) });
}

function loadMyMusic() {
    fetch(getURL("json/my_music.json"))
    .then(async (res) => {
        const json = await res.json();
        mySongList = json.songs;
        getMyMusic();
        document.getElementById("my-songs").removeChild(document.getElementById("my-songs-loader"));
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

function getMyMusic() {
    if(!mySongList)
        return;

    const mySongs = document.getElementById("my-songs");
    for(let i = 0; i < mySongList.length; i++) {
        const newSongElement = createMySongElement(mySongList[i]);
        mySongs.appendChild(newSongElement);
    }
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

function createMySongElement(song) {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song");

    const nameP = document.createElement("p");
    nameP.innerHTML = song.name;

    const audio = document.createElement("audio");
    audio.setAttribute("controls", "");

    const source = document.createElement("source");
    source.setAttribute("src", song.src);
    source.setAttribute("type", "audio/" + song.src.split(".")[1]);

    songDiv.appendChild(nameP);
    songDiv.appendChild(audio);
    audio.appendChild(source);

    return songDiv;
}