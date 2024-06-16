let prevRoute = "";

const routes = {
    "#/": { render: bio, onMount: () => {} },
    "#/404": { render: error404, onMount: () => {} },
    "#/feed": { render: feed, onMount: loadFeed },
    "#/characters": { render: characters, onMount: () => {} },
    "#/projects": { render: projects, onMount: loadProjects },
    "#/music": { render: music, onMount: () => { loadRecentObsessions();loadMyMusic(); } }
};

function navigate(hash) {
    let view = routes[hash];

    if(view) {
        document.getElementById("content").innerHTML = view.render();
        view.onMount();
        recalculatePageResolution();
        prevRoute = hash;
        return;
    }

    if(hash) {
        navigate("#/404");
        return;
    }
    navigate("#/");
}

function route() {
    const split = window.location.hash.split("#");

    if(split.length == 0 || split.length == 1) {
        navigate(window.location.hash);
        return;
    }

    if(split.length >= 2) {
        if(prevRoute == `#${split[1]}`)
            return;

        navigate(`#${split[1]}`);
        return;
    }
}

window.onhashchange = (e) => { route(); };
window.addEventListener("DOMContentLoaded", e => { route(); });
window.onclick = (e) => {
    if(e.target.matches("[in-link]")) {
        e.preventDefault();
        document.getElementById(e.target.getAttribute("to")).scrollIntoView();
    }
}

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