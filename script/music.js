function loadRecentObsessions() {
    const recentObsessions = document.getElementById("recent-obsessions");
    fetch(getURL("json/recent_obsessions.json"))
        .then(async (res) => {
            const json = await res.json();
            for(let i = 0; i < json.songs.length; i++) {
                // <a target="_blank" href="https://www.youtube.com/watch?v=rsF5EWOQN9Y">Jerry Terry - Kiss Me (Kill Me)</a> - <i>Jeez, this gave me goosebumps...</i>
                const newLi = document.createElement("li");
                const newAnchor = document.createElement("a");

                newAnchor.setAttribute("target", "_blank");
                newAnchor.setAttribute("href", json.songs[i].url);
                newAnchor.innerHTML = json.songs[i].artist + " - " + json.songs[i].name;

                newLi.appendChild(newAnchor);
                if(json.songs[i].description.length > 0) {
                    const newI = document.createElement("i");
                    newI.innerHTML = " - " + json.songs[i].description;
                    newLi.appendChild(newI);
                }

                recentObsessions.appendChild(newLi);
            }
        })
        .catch((err) => { console.log(err) });
}