export const title = "Welcome to my bio!";

export const onMount = (params) => {};

export const html = /* html */ `
        <div class="pfp-wrapper">
            <img title="Art by Fauvfox" class="circle" src="content/img/ham.png" width="200" height="200">
            <div class="bio-links">
                <a href="javascript:copyHandle()">
                    <svg width="30" height="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                </a>
                <a target="_blank" href="https://github.com/TheHamester">
                    <svg width="30" height="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a target="_blank" href="https://steamcommunity.com/id/hamester00/">
                    <svg width="30" height="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Steam</title><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>
                </a>
                <a target="_blank" href="https://bsky.app/profile/hamester.bsky.social">
                    <svg width="30" height="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>BlueSky</title><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>
                </a>
            </div>
            <div class="pronouns">Azzy - they/them - 24</div>
        </div>
        <p>
            Hello! My name is Hamester, or you can just call me Ham or Azzy. I'm your local <em class="bisexual">bisexual</em> and <em class="non-binary">non-binary</em> pyromancer arctic fox!
            You can find more information about my characters and lore on the <a href="/#/wiki">Wiki</a> page! Some updates and random thoughts I will be posting on the
            <a href="/#/feed">Feed</a> page.
        </p>

        <h2>Music</h2>
        <p>
            I spend a lot of my time sitting and listening to my limited playlist of music, mostly indie, rock, and EDM, 
                and a lot of the time I listen to the same few songs on repeat until I get tired of them! Also slight fan of hyper-pop and metal.
            You can read more about my musical preferences on the <a href="/#/music">Music</a> page!
        </p>

        <h2>Nerd Stuff</h2>
        <p>
            I'm a nerd! I like coding whenever I have any ideas or motivation, which... is rarely the case... 
            As of now my most notable project is the <a target="_blank" href="https://github.com/TheHamester/HitIndicator">Hit Indication</a> mod for Minecraft. 
            You can read more about my projects on the <a href="/#/projects">Projects</a> page.
        </p>
        <p>
            I like logic puzzles, really big enjoyer of solving <a target="_blank" href="https://www.nikoli.co.jp/en/puzzles/">Nikoli</a> type puzzles. 
            My favorite genres are probably Starbattle, LITS, Nurikabe, Heyawake, Fillomino and their derivatives.
            I used to play chess back in 2021, got to rating of 800 on chess.com, but not anymore nowadays. Also do play Riichi Mahjong sometimes.
        </p>

        <h2>Games</h2>
        <p>
            I'm not a big gamer, but I have over 4000 hours in <a target="_blank" href="https://store.steampowered.com/app/322170/Geometry_Dash/">Geometry Dash</a>! 
            Am I good at this game?.. Well... I'm a top 1000 star grinder, not much of a demon slayer, also had a pretty big break so 
            I'm pretty rusty... and don't really play that game too much anymore, but I do come back to it from time to time, 'cause I have a lot of fond 
            memories with it.
        </p>
        <p>
            Overall I'm a big fan of music/rhythm games like <a target="_blank" href="https://github.com/etternagame/etterna">Etterna</a> 
            and <a target="_blank" href="https://store.steampowered.com/app/977950/A_Dance_of_Fire_and_Ice/">ADoFaI</a>, 
            incremental games like <a target="_blank" href="https://store.steampowered.com/app/1399720/Antimatter_Dimensions/">Antimatter Dimensions</a> 
            and precision platformers like <a target="_blank" href="https://store.steampowered.com/app/504230/Celeste/">Celeste</a>; 
            and of course <a target="_blank" href="https://www.minecraft.net/">Minecraft</a>, whenever I feel like doing anything!
        </p>
`;
