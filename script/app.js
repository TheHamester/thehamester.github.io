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