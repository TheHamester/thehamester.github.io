export const title = "Art";

export const onMount = (params) => loadArt();

export const html = /* html */ `
    <div id="artworks">
        <div class="loader" id="artworks-loader"></div>
    </div>
    <a id="load-more-button" href="javascript:getMoreArtworks()">Load More</a>
`;
