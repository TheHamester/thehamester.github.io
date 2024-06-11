function copyHandle() {
    navigator.clipboard.writeText("hamester");

    notification = document.getElementById("notification");
    if(notification.classList.length === 0) {
        notification.classList.add("notification-anim");
        setTimeout(() => notification.classList.remove("notification-anim"), 1500);
    }
}