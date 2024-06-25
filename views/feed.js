export const title = "Feed";

export const onMount = (params) => loadFeed(params);

export const html = /* html */ `
    <div id="posts">
        <div class="loader" id="posts-loader"></div>
    </div>
    <a id="load-more-button" href="javascript:getMorePosts()">Load More</a>
`;
