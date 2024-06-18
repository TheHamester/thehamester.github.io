const wikiPages = [
    "main", 

    "overseers/oth", "overseers/xa", "overseers/bogul", "overseers/hamester", "overseers/frysen", 
    "overseers/hyra", "overseers/oth", "overseers/paraoh", "overseers/tamuth", "overseers/zemothel", "overseers/faenah",

    "divinities/sedosa", "divinities/anetha",

    "locations/island-jole", "locations/island-luth", "locations/island-may", "locations/island-ochron", "locations/island-pyx",
    "locations/moryx-system", "locations/the-nucleus", "locations/moryx"
]

async function wikiOnMount() {
    const hash = window.location.hash;
    const split = hash.split("/");

    if(split.length < 2) {
        navigate("#/404");
        return;
    }

    if(split.length == 2 || split.length == 3 && split[2] == "") {
        await loadPage("main");
        return;
    }

    await loadPage(split.slice(2).join("/"));
}

async function loadPage(name) {
    if(!wikiPages.includes(name)) {
        navigate("#/404");
        return;
    }

    await import(`/js/views/wiki/${name}.js`).then(async (module) => {
        const wikiPageElement = document.getElementById("wiki-page");
        const titleElement = document.getElementById("wiki-page-title");
        const seeAlsoElement = document.getElementById("wiki-see-also");

        const html = await module.html;
        const title = await module.title;
        const seeAlso = await module.seeAlso;
        if(seeAlso.length != 0) {
            const divElement = document.createElement("div");
            const h2 = document.createElement("h2");
            h2.innerHTML = "See Also"
            seeAlsoElement.appendChild(h2);
            seeAlsoElement.appendChild(divElement);

            for(let i = 0; i < seeAlso.length; i++) {
                const newA = document.createElement("a");
                divElement.appendChild(newA);

                await import(`/js/views/wiki/${seeAlso[i]}.js`).then(async (seeAlsoModule) => {
                    newA.setAttribute("href", `#/wiki/${seeAlso[i]}`);
                    newA.innerHTML = await seeAlsoModule.title;
                });
            }
        }

        wikiPageElement.innerHTML = html;
        titleElement.innerHTML = title;
    });
}
