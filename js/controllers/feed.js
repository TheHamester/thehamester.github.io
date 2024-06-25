const postPagination = 3;

let postsLoaded;
let imagesLoaded;
let postList;

async function loadFeed(params) {
    postsLoaded = 0;
    imagesLoaded = 0;
    postList = null;

    if(!postList) {
        const json = await fetchJSON("content/json/feed.json");
        postList = json.posts;
    }

    if(params && params.id && params.id >= 0 && params.id < postList.length)
        loadOnePost(params.id);
    else {
        getMorePosts();

        const loadMoreButton = document.getElementById("load-more-button");
        if(loadMoreButton)
            loadMoreButton.style.display = "block";
    }

    document.getElementById("posts").removeChild(document.getElementById("posts-loader"));
}

function getMorePosts() {
    if(!postList)
        return;

    const end = Math.min(postsLoaded + postPagination, postList.length);
    const postsDiv = document.getElementById("posts");
    for(let i = postsLoaded; i < end; i++) {
        const postDiv = createPostDiv(postList[i], false);
        postsDiv.appendChild(postDiv);
        if(i != postList.length - 1) {
            const hr = document.createElement("hr");
            hr.classList.add("separator");
            postsDiv.appendChild(hr);
        }
        postsLoaded++;
    }

    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.classList.remove(...loadMoreButton.classList);
    loadMoreButton.classList.add("center-link");
    if(postsLoaded >= postList.length)
        document.getElementById("content").removeChild(loadMoreButton);

    const backToFeed = document.getElementById("back-link");
    backToFeed.style.display = "none";
}

function loadOnePost(id) {
    if(!postList)
        return;

    const postsDiv = document.getElementById("posts");
    const postDiv = createPostDiv(postList[postList.length - id - 1], true);
    postsDiv.appendChild(postDiv);

    const backToFeed = document.getElementById("back-link");
    backToFeed.innerHTML = "<< Back to Feed";
    backToFeed.setAttribute("href", `#/feed`);
    backToFeed.style.display = "block";
}

function createPostDiv(post, displayFull) {
    const postDiv = document.createElement("div");
    postDiv.setAttribute("id", `post-${postList.length - postsLoaded - 1}`);

    const header = document.createElement("h3");
    postDiv.appendChild(header);
    if(!displayFull) {
        const headerLink = document.createElement("a");
        headerLink.setAttribute("href", `#/feed?id=${postList.length - postsLoaded - 1}`);
        header.appendChild(headerLink);
        if(postsLoaded % 2 == 0) {
            header.classList.add("post-p-left");
            headerLink.innerHTML = post.title;
            header.innerHTML += " - " + post.date;
        } else {
            header.classList.add("post-p-right");
            headerLink.innerHTML = post.title;
            header.innerHTML = post.date + " - " + header.innerHTML;
        }
    } else {
        if(postsLoaded % 2 == 0) {
            header.classList.add("post-p-left");
            header.innerHTML = post.title + " - " + post.date;
        } else {
            header.classList.add("post-p-right");
            header.innerHTML = post.date + " - " + post.title;
        }
    }

    if(post.image) {
        const image = document.createElement("img");
        image.classList.add("post-img");
        image.classList.add(imagesLoaded % 2 == 0 ? "float-left" : "float-right");
        image.classList.add(post.image.style);

        if(post.image.width) image.setAttribute("width", post.image.width);
        if(post.image.height) image.setAttribute("height", post.image.height);

        image.setAttribute("src", post.image.src);
        postDiv.appendChild(image);
        imagesLoaded++;
    }

    for(let i = 0; i < (displayFull ? post.text.length : Math.min(3, post.text.length)); i++) {
        const p = document.createElement("p");
        p.innerHTML = post.text[i];
        postDiv.appendChild(p);
    }

    if(!displayFull && post.text.length > 2) {
        const readMoreA = document.createElement("a");
        readMoreA.classList.add("center-link");
        readMoreA.setAttribute("href", `javascript:readMore(${postsLoaded})`);
        readMoreA.setAttribute("id", `post-${postsLoaded}-read-more`)
        readMoreA.innerHTML = "Read More";
        postDiv.appendChild(readMoreA);
    }

    return postDiv;
}

function readMore(id) {
    const postDiv = document.getElementById(`post-${id}`);
    for(let i = 2; i < postList[id].text.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = postList[id].text[i];
        postDiv.appendChild(p);
    }

    postDiv.removeChild(document.getElementById(`post-${id}-read-more`));
}