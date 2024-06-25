async function wikiOnMount() {
    const hash = window.location.hash;
    const split = hash.split("/");

    if(split.length < 2) {
        navigate("404");
        return;
    }

    if(split.length == 2 || split.length == 3 && split[2] == "") {
        await loadWikiPage("main");
        return;
    }

    const end = split[split.length - 1] ? split.length : split.length - 1;
    await loadWikiPage(split.slice(2, end).join("/"));
}

async function loadWikiPage(name) {
    if(!wikiPages.includes(name)) {
        navigate("404");
        return;
    }

    await import(`/views/wiki/${name}.js`).then(async (module) => {
        const wikiPageElement = document.getElementById("wiki-page");
        const titleElement = document.getElementById("page-title");
        const seeAlsoElement = document.getElementById("wiki-see-also");

        const html = await module.html;
        const title = await module.title;
        const seeAlso = await module.seeAlso;
        const hub = await module.hub;
        if(seeAlso.length != 0) {
            const divElement = document.createElement("div");
            const h2 = document.createElement("h2");
            h2.innerHTML = "See Also"
            seeAlsoElement.appendChild(h2);
            seeAlsoElement.appendChild(divElement);

            for(let i = 0; i < seeAlso.length; i++) {
                const newA = document.createElement("a");
                divElement.appendChild(newA);

                newA.setAttribute("href", `#/wiki/${seeAlso[i].route}`);
                newA.innerHTML = seeAlso[i].title;
            }
        }

        const hubLinkAnchorElement = document.getElementById("back-link");
        const content = document.getElementById("content");
        const hr = document.createElement("hr");
        hr.classList.add("separator");
        content.insertBefore(hr, seeAlsoElement);
        hubLinkAnchorElement.style.display = "none";
        if(hub) {
            hubLinkAnchorElement.style.display = "block";

            hubLinkAnchorElement.innerHTML = `<< ${hub.title}`;
            hubLinkAnchorElement.setAttribute("href", `#/wiki/${hub.link}`);
        }

        wikiPageElement.innerHTML = html;
        titleElement.innerHTML = title;
    });
}
