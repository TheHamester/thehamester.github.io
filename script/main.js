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

let sparkleId = 0;

function spawnBackgroundEffects() {
    for(let i = 0; i < 10; i++)
        setTimeout(() => { createSparkle(true); }, i * 20);
    

    setInterval(() => {
        setTimeout(() => { createSparkle(false); }, parseInt(Math.floor(Math.random() * 1000)))
    }, 500);
}

function createSparkle(setRandomHeight) {
    const pageWidth = Math.max( document.body.scrollWidth, document.body.offsetWidth, 
        document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth );
    const pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

    const sparkle = createSparkleObject(pageWidth, pageHeight, setRandomHeight);
    const sparkleElement = createSparkleElement(sparkle, pageWidth, pageHeight);

    sparkleId++;
}

function createSparkleElement(sparkle, pageWidth, pageHeight) {
    const pageWrapper = document.getElementById("page-wrapper");
    const images = ["img/HamesterIcon.png", "img/HamesterIcon2.png", "img/HamesterIcon3.png"]

    const sparkleElement = document.createElement("img");
    sparkleElement.classList.add("sparkle");
    sparkleElement.setAttribute("width", sparkle.width);
    sparkleElement.setAttribute("src", images[sparkle.imageId]);
    sparkleElement.setAttribute("draggable", false);
    sparkleElement.style.left = sparkle.x / pageWidth * 100 + "%";
    sparkleElement.style.top = sparkle.y + "px";
    pageWrapper.appendChild(sparkleElement);

    let timeoutSet = false;
    const interval = setInterval(() => { 
        sparkle.y += sparkle.speed;
        sparkle.speed += sparkle.accel;
        //sparkle.rotation += sparkle.rotationSpeed;
        sparkleElement.style.top = sparkle.y / pageHeight * 100 + "%";
        sparkleElement.style.transform = "rotate(" + sparkle.rotation + "deg)";
        if(sparkle.y > pageHeight - 2 * sparkle.width && !timeoutSet) {
            sparkleElement.classList.add("removing-sparkle");
            setTimeout(() => { 
                pageWrapper.removeChild(sparkleElement); 
                clearInterval(interval); 
            }, 1100);
            timeoutSet = true;
        }
    }, 16);

    return sparkleElement;
}

function createSparkleObject(pageWidth, pageHeight, setRandomHeight) {
    const width = random(50, 200);
    const x = sparkleId % 2 == 0 ? random(0, pageWidth / 2 - 250) : random(pageWidth / 2 + 250, pageWidth);
    const y = setRandomHeight ? random(0, 750) : 0;
    const speed = random(1, 3);
    const accel = random(0.001, 0.005);
    const rotationSpeed = random(0.25, 0.5) * (Math.random() < 0.5 ? -1 : 1);
    const imageId = Math.floor(random(0, 3));
    return {
        width: width,
        imageId: imageId,
        speed: speed,
        accel: accel,
        rotationSpeed: rotationSpeed,
        rotation: 0,
        x: x,
        y: y
    };
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}