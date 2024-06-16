const routes = {
    "#/": { render: bio, onMount: () => {} },
    "#/404": { render: error404, onMount: () => {} },
    "#/feed": { render: feed, onMount: loadFeed },
    "#/characters": { render: characters, onMount: () => {} },
    "#/projects": { render: projects, onMount: loadProjects },
    "#/music": { render: music, onMount: () => { loadRecentObsessions();loadMyMusic(); } }
};

function router(hash) {
    let view = routes[hash];

    if(view) {
        document.getElementById("content").innerHTML = view.render();
        view.onMount();
        recalculatePageResolution();
        return;
    }

    if(hash) {
        router("#/404");
        return;
    }
    router("#/");
}

window.onhashchange = (e) => {
    router(window.location.hash);
};

window.addEventListener("DOMContentLoaded", e => router(window.location.hash));

function pushNotification(text) {
    const notifications = document.getElementById("notifications");

    const newNotification = document.createElement("div");
    newNotification.classList.add("notification");
    newNotification.innerHTML = text;
    notifications.appendChild(newNotification);

    setTimeout(() => { 
        notifications.removeChild(newNotification);
    }, 1500);
}

function copyHandle() {
    navigator.clipboard.writeText("hamester");
    pushNotification("Handle copied to your clipboard!");
}

function toggleDarkMode() {
    if(localStorage.getItem("ham-bio-darkmode") == "false") {
        document.body.classList.add("dark");
        document.getElementById("theme-icon-sun").classList.add("theme-icon-visible");
        document.getElementById("theme-icon-moon").classList.remove("theme-icon-visible");
        localStorage.setItem("ham-bio-darkmode", "true");
    } else {
        document.body.classList.remove("dark");
        document.getElementById("theme-icon-moon").classList.add("theme-icon-visible");
        document.getElementById("theme-icon-sun").classList.remove("theme-icon-visible");
        localStorage.setItem("ham-bio-darkmode", "false");
    }
}

function initTheme() {
    if(localStorage.getItem("ham-bio-darkmode") === null) {
        localStorage.setItem("ham-bio-darkmode", matchMedia("(prefers-color-scheme: dark)").matches);
    }

    if(localStorage.getItem("ham-bio-darkmode") == "true") {
        document.body.classList.add("dark");
        document.getElementById("theme-icon-sun").classList.add("theme-icon-visible");
        return;
    }

    document.getElementById("theme-icon-moon").classList.add("theme-icon-visible");
}