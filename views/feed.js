function feed() {
    return /* html */ `
        <a id="back-to-feed" href="#/feed">&lt;&lt; Back to Feed</a>
        <h1>Feed</h1>
        <hr>
        <div id="posts">
            <div class="loader" id="posts-loader"></div>
        </div>
        <a id="load-more-button" href="javascript:getMorePosts()">Load More</a>
    `;
}