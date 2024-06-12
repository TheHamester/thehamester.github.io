function addNotification(text) {
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
    addNotification("Handle copied to your clipboard!");
}

function toggleDarkMode() {
    if(localStorage.getItem("ham-bio-darkmode") == "false") {
        document.body.classList.add("dark");
        localStorage.setItem("ham-bio-darkmode", "true");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("ham-bio-darkmode", "false");
    }
}

function onPageLoad() {
    if(localStorage.getItem("ham-bio-darkmode") === null) {
        localStorage.setItem("ham-bio-darkmode", "false");
        return;
    }

    if(localStorage.getItem("ham-bio-darkmode") == "true") {
        document.body.classList.add("dark");
    }
}