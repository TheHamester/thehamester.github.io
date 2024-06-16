const INIT_SPARKLE_COUNT = 10;
const INIT_SPARKLE_CREATE_INTERVAL = 20;
const NEW_SPARKLE_SCHEDULE_INTERVAL = 500;
const NEW_SPARKLE_INTERVAL_SPREAD = 1000;
const UPDATE_RATE = 16;
const IMAGES = ["img/HamesterIcon.png", "img/HamesterIcon2.png"];

let sparkleId = 0;
let pageWidth = 0;
let pageHeight = 0;
let sparkles = [];

function spawnBackgroundEffects() {
    pageWidth = Math.max( document.body.scrollWidth, document.body.offsetWidth, 
        document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth );
    pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

    for(let i = 0; i < INIT_SPARKLE_COUNT; i++)
        setTimeout(() => { createSparkle(true); }, i * INIT_SPARKLE_CREATE_INTERVAL);
    
    setInterval(() => {
        setTimeout(() => { createSparkle(false); }, parseInt(Math.floor(Math.random() * NEW_SPARKLE_INTERVAL_SPREAD)))
    }, NEW_SPARKLE_SCHEDULE_INTERVAL);
}

function createSparkle(setRandomHeight) {
    const sparkle = createSparkleObject(setRandomHeight);
    sparkles.push(sparkle);
    addSparkleElement(sparkle);

    sparkleId++;
}

function addSparkleElement(sparkle) {
    const pageWrapper = document.getElementById("page-wrapper");

    const sparkleElement = document.createElement("img");
    sparkleElement.classList.add("sparkle");
    sparkleElement.setAttribute("width", sparkle.width);
    sparkleElement.setAttribute("src", IMAGES[sparkle.imageId]);
    sparkleElement.setAttribute("draggable", false);
    sparkleElement.style.left = sparkle.x / pageWidth * 100 + "%";
    sparkleElement.style.top = sparkle.y + "px";
    if(sparkle.flip)
        sparkleElement.style.transform = "scaleX(-1)";
    pageWrapper.appendChild(sparkleElement);

    sparkle.interval = setInterval(() => { 
        sparkelUpdate(sparkle, sparkleElement, pageWrapper) 
    }, UPDATE_RATE);
}

function sparkelUpdate(sparkle, sparkleElement, pageWrapper) {
    sparkle.y += sparkle.speed;
    sparkle.speed += sparkle.accel;

    sparkleElement.style.top = sparkle.y / pageHeight * 100 + "%";
    if(sparkle.y > pageHeight - 2 * sparkle.width && !sparkle.timeoutSet) {
        sparkleElement.classList.add("removing-sparkle");
        sparkle.timeout = setTimeout(() => { 
            pageWrapper.removeChild(sparkleElement);
            sparkles.splice(sparkles.indexOf(sparkle), 1);
            clearInterval(sparkle.interval); 
            removed = true;
        }, 1100);
        sparkle.timeoutSet = true;
    }

    if(sparkle.y > pageHeight - sparkle.width - 1) {
        pageWrapper.removeChild(sparkleElement);
        sparkles.splice(sparkles.indexOf(sparkle), 1);
        clearInterval(sparkle.interval);
        if(sparkle.timeout)
            clearTimeout(sparkle.timeout);
    }
}

function createSparkleObject(setRandomHeight) {
    const width = random(50, 200);
    const x = sparkleId % 2 == 0 ? random(3 * width / 2, pageWidth / 2 - 500) : random(pageWidth / 2 + 500, pageWidth - 3 * width / 2);
    const y = setRandomHeight ? random(0, 750) : 0;
    const speed = random(1, 3);
    const accel = random(0.001, 0.005);
    const imageId = Math.floor(random(0, IMAGES.length));
    const flip = Math.random() < 0.5;
    return {
        width: width,
        imageId: imageId,
        speed: speed,
        accel: accel,
        flip: flip,
        x: x,
        y: y,
        timeoutSet: false,
        timeout: undefined,
        interval: undefined
    };
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}