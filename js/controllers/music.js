const songPagination = 4;

let loadedSongs;
let songList;
let currentPage;
let lastPage;

async function loadRecentObsessions(params) {
    loadedSongs = 0;
    currentPage = 0;
    songList = undefined;

    const json = await fetchJSON("content/json/recent_obsessions.json");
    songList = json.songs;
    lastPage = Math.floor(songList.length / songPagination) + (songList.length % songPagination != 0 ? 1 : 0) - 1;
    displayPage(0);
    document.getElementById("prev-button").innerHTML = "";
    document.getElementById("prev-button").style.cursor = "default";
}

function prevPage() {
    if(currentPage == 0)
        return;

    currentPage--;
    if(currentPage == 0) {
        document.getElementById("prev-button").innerHTML = "";
        document.getElementById("prev-button").style.cursor = "default";
    }

    if(currentPage < lastPage) {
        document.getElementById("next-button").innerHTML = "Next &gt&gt";
        document.getElementById("next-button").style.cursor = "pointer";
    }
    
    displayPage(currentPage);
}

function nextPage() {
    if(currentPage == lastPage)
        return;

    currentPage++;
    if(currentPage == lastPage) {
        document.getElementById("next-button").innerHTML = "";
        document.getElementById("next-button").style.cursor = "default";
    }

    if(currentPage > 0) {
        document.getElementById("prev-button").innerHTML = "&lt&lt Prev";
        document.getElementById("prev-button").style.cursor = "pointer";
    }

    displayPage(currentPage);
}

function displayPage(pageNum) {
    if(!songList)
        return;

    const recentObsessions = document.getElementById("recent-obsessions");
    recentObsessions.innerHTML = "";

    const songBlockDiv = document.createElement("div");
    songBlockDiv.classList.add("song-block");
    recentObsessions.appendChild(songBlockDiv);

    const end = Math.min((pageNum + 1) * songPagination, songList.length);

    for(let i = pageNum * songPagination; i < end; i++) {
        const newSongElement = createSongElement(songList[i]);
        songBlockDiv.appendChild(newSongElement);
        loadedSongs++;
    }
}

function createSongElement(song) {
    const div = document.createElement("div");
    const innerDiv = document.createElement("div");
    const anchor = document.createElement("a");
    const img = document.createElement("img");
    const imgAnchor = document.createElement("a");

    imgAnchor.appendChild(img);
    imgAnchor.setAttribute("href", song.url);
    imgAnchor.setAttribute("target", "_blank");

    const videoId = new URL(song.url).searchParams.get("v");
    img.setAttribute("width", 60);
    img.setAttribute("src", `https://img.youtube.com/vi/${videoId}/0.jpg`);
    div.appendChild(imgAnchor);
    div.appendChild(innerDiv);

    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("href", song.url);
    anchor.innerHTML = song.artist + " - " + song.name;
    innerDiv.appendChild(anchor);

    if(song.description.length > 0) {
        const newI = document.createElement("i");
        newI.innerHTML = song.description;
        innerDiv.appendChild(newI);
    }

    return div;
}