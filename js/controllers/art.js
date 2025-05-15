const artPagination = 6;

let artworksLoaded;
let artworksList;

async function loadArt() {
    artworksLoaded = 0;
    artworksList = null;

    if(!artworksList) {
        const json = await fetchJSON("content/json/art.json");
        artworksList = json.art;
    }

    getMoreArtworks();

    const loadMoreButton = document.getElementById("load-more-button");
    if(loadMoreButton)
        loadMoreButton.style.display = "block";

    document.getElementById("artworks").removeChild(document.getElementById("artworks-loader"));
}


function getMoreArtworks() {
    if(!artworksList)
        return;

    const end = Math.min(artworksLoaded + artPagination, artworksList.length);
    const artworksDiv = document.getElementById("artworks");
    for(let i = artworksLoaded; i < end; i++) {
        const artworkDiv = createArtworkDiv(artworksList[i]);
        artworksDiv.appendChild(artworkDiv);

        if(i != artworksList.length - 1) {
            const hr = document.createElement("hr");
            hr.classList.add("separator");
            artworksDiv.appendChild(hr);
        }

        artworksLoaded++;
    }

    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.classList.remove(...loadMoreButton.classList);
    loadMoreButton.classList.add("center-link");
    if(artworksLoaded >= artworksList.length)
        document.getElementById("content").removeChild(loadMoreButton);
}

function createArtworkDiv(artwork) {
    const artworkDiv = document.createElement("div");
    artworkDiv.classList.add("creative-works-artwork");

    const header = document.createElement("p");
    header.classList.add("creative-works-artwork-header");
    header.innerHTML = artwork.name;
    artworkDiv.appendChild(header);

    const image = document.createElement("img");
    image.classList.add("square");
    image.setAttribute("src", `/content/img/art/${artwork.src}`);
    image.setAttribute("alt", artwork.alt);
    artworkDiv.appendChild(image);

    image.setAttribute("width", 150);
    image.setAttribute("height", 150);

    if(artwork.description) {
        const descriptionDiv = document.createElement("p");
        descriptionDiv.classList.add("creative-works-artwork-description");
        descriptionDiv.innerHTML = artwork.description;
        artworkDiv.appendChild(descriptionDiv);
    }

    return artworkDiv;
}