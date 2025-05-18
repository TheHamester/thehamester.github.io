export const title = "Music I Like";

export const onMount = loadRecentObsessions

export const html = /* html */ `
    <p>
        My music taste mostly contains from EDM, Synth Pop, Indie Rock, Pop Punk, Hyper Pop, Nerdcore and Metal. When I find new music I like, I usually re-listen the hell out of it
        on repeat for a while, and as a result a lot of the time I have a strong association of a song or an album with a certain time period of my life. I have 2 main 
        playlists on youtube where I put music. The first one is where I put songs I'm obsessing with, the other one is a special one with songs that have liminal/lonely
        feeling to them which create the vibe I really enjoy.
    </p>
    <p>
        My favorite artists are 
        <a target="_blank" href="https://music.youtube.com/channel/UCUt2uP6O_UBJp4aBx5KjQjA">Porter Robinson</a> and 
        <a target="_blank" href="https://music.youtube.com/channel/UC9TynkEiIsDxKjtDZKmiUvw">Madeon</a> on EDM, and Synth Pop side; 
        <a target="_blank" href="https://music.youtube.com/channel/UC9xRJvhCNHF3Kv8j9jEA6tQ">Tally Hall</a>, 
        <a target="_blank" href="https://music.youtube.com/channel/UCOk35jhmr5852r8_XHQSguQ">Lemon Demon</a>, 
        <a target="_blank" href="https://music.youtube.com/channel/UCbI9iBN07igKwQQ9bJ2Mk4g">Good Kid</a>,
        <a target="_blank" href="https://music.youtube.com/channel/UC5EH9egdct4dmAo3AHwzPBA">The Living Tombstone</a>,
        <a target="_blank" href="https://www.youtube.com/@LonelyBunker">Lonely Bunker</a> on Indie Rock and Pop Punk side; 
        <a target="_blank" href="https://www.youtube.com/@underscores">underscores</a> on Hyperpop side, specifically the 
        <a target="_blank" href="https://www.youtube.com/playlist?list=PLP8-VIosTTwGFG1lutyBq_54kC3X9fCaY">fishmonger</a> album;
        <a target="_blank" href="https://music.youtube.com/channel/UCNWlpvpVcwDOOEge616cKew">Dan Bull</a>,
        <a target="_blank" href="https://music.youtube.com/channel/UCu4RfL3ws2Vdn_McCqbmQEA">Stupendium</a> on the Nerdcore side.
    </p>
    <p>
        Also I do enjoy a good FNF song, which not a lot of people could relate to, cause the vocals might not be for everyone, 
        but I do believe music that comes from FNF mods is made by some of the biggest talents in the community, and, if you're not a fan of the vocals,
        instrumentals are just as good. I really recommend music from 
        <a target="_blank" href="https://www.youtube.com/playlist?list=PL7Pj5GL7sfP0DH_SUfYqWjYxsxZ28VcYq">Impostor v4</a> and 
        <a target="_blank" href="https://www.youtube.com/playlist?list=PL9EHBGmTzTpojIFSQUv-mByN_57SHV9rN">Mario's Madness v2</a> mods, they in my, opinion, have the most bangers.
    </p>
    <ul>
        <li>My Main Playlist - <a target="_blank" href="https://music.youtube.com/playlist?list=PLCfnjnJ_kZJrSo1jvIitOwa5FeWbXISs_">Certified Bop</a></li>
        <li>Liminal/Lonely Playlist - <a target="_blank" href="https://music.youtube.com/playlist?list=PLCfnjnJ_kZJoxoLNOlhPfq5xspda3EHCn">When You’re the Last Person Left on the Planet</a></li>
    </ul>

    <h2>Recent Obsessions</h2>
    <div id="recent-obsessions">
        <div class="loader" id="recent-obsessions-loader"></div>
    </div>
    <div id="page-controls">
        <a id="prev-button" href="javascript:prevPage()">&lt&lt Prev</a>
        <a id="next-button" href="javascript:nextPage()">Next &gt&gt</a>
    </div>
`;
