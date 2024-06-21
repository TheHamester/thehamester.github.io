const postPagination = 3;

let postsLoaded;
let imagesLoaded;
let postList;


async function loadFeed() {
    postsLoaded = 0;
    imagesLoaded = 0;
    postList = null;

    const json = await fetchJSON("content/json/feed.json");
    postList = json.posts;
    getMorePosts();
    document.getElementById("posts").removeChild(document.getElementById("posts-loader"));

    const loadMoreButton = document.getElementById("load-more-button");
    if(loadMoreButton)
        loadMoreButton.style.display = "block";
}

function getMorePosts() {
    if(!postList)
        return;

    const end = Math.min(postsLoaded + postPagination, postList.length);
    const postsDiv = document.getElementById("posts");
    for(let i = postsLoaded; i < end; i++) {
        const postDiv = createPostDiv(postList[i]);
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
}

function createPostDiv(post) {
    const postDiv = document.createElement("div");
    postDiv.setAttribute("id", `post-${postsLoaded}`);

    const header = document.createElement("h3");
    if(postsLoaded % 2 == 0) {
        header.classList.add("post-p-left");
        header.innerHTML = post.title + " - " + post.date;
    } else {
        header.classList.add("post-p-right");
        header.innerHTML = post.date + " - " + post.title;
    }
    postDiv.appendChild(header);

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

    for(let i = 0; i < Math.min(2, post.text.length); i++) {
        const p = document.createElement("p");
        p.innerHTML = post.text[i];
        postDiv.appendChild(p);
    }

    if(post.text.length > 2) {
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