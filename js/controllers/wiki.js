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
        const wikiPage = document.getElementById("wiki-page");
        const title = document.getElementById("wiki-page-title");
        wikiPage.innerHTML = await module.html;
        title.innerHTML = await module.title;
    });
}
