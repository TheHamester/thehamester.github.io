export const title = "Music";

export const onMount = loadMyMusic;

export const html = /* html */ `
    <p>
        I do try to create my own music sometimes. Most of the times the process ends barely even starting, 
        but I can drop some stuff here that did result into some half-decent product or just WIPs.
        Those I do finish I upload to my <a target="_blank" href="https://hamester.newgrounds.com/">Newgrounds</a> 
        and <a target="_blank" href="https://soundcloud.com/hamester-654955911">Soundcloud</a> pages.
        <div id="my-songs">
            <div class="loader" id="my-songs-loader"></div>
        </div>
    </p>
`;