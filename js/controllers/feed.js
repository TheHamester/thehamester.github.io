const postPagination = 3;

let postsLoaded;
let imagesLoaded;
let postList;


function loadFeed() {
    postsLoaded = 0;
    imagesLoaded = 0;
    postList = undefined;

    fetch(getURL("json/feed.json"))
        .then(async (res) => {
            const json = await res.json();
            postList = json.posts;
            getMorePosts();
            document.getElementById("posts").removeChild(document.getElementById("posts-loader"));

            const loadMoreButton = document.getElementById("load-more-button");
            if(loadMoreButton)
                loadMoreButton.style.display = "block";
        })
        .catch((err) => console.log(err));
}

function getMorePosts() {
    if(!postList)
        return;

    const end = Math.min(postsLoaded + postPagination, postList.length);
    const postsDiv = document.getElementById("posts");
    for(let i = postsLoaded; i < end; i++) {
        const postDiv = createPostDiv(postList[i]);
        postsDiv.appendChild(postDiv);
        postsLoaded++;
    }

    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.classList.remove(...loadMoreButton.classList);
    loadMoreButton.classList.add(postsLoaded % 2 == 0 ? "post-a-left" : "post-a-right")
    if(postsLoaded >= postList.length)
        document.getElementById("content").removeChild(loadMoreButton);
}

function createPostDiv(post) {
    const postDiv = document.createElement("div");

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

    for(let i = 0; i < post.text.length; i++) {
        const p = document.createElement("p");
        p.innerHTML = post.text[i];
        postDiv.appendChild(p);
    }

    return postDiv;
}