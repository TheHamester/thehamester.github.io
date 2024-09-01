const INIT_SPARKLE_COUNT = 10;
const INIT_SPARKLE_CREATE_INTERVAL = 20;
const NEW_SPARKLE_SCHEDULE_INTERVAL = 500;
const NEW_SPARKLE_INTERVAL_SPREAD = 1000;
const REMOVING_ELEMENT_TIMEOUT = 1100;
const UPDATE_RATE = 16;
const IMAGES = [
    "content/img/sparkles/jeff_the_killer_jumpscare.png",
    "content/img/sparkles/hamester.png", 
    "content/img/sparkles/arrow_left_red.png", 
    "content/img/sparkles/arrow_left_yellow.png", 
    "content/img/sparkles/arrow_left_blue.png",
    "content/img/sparkles/arrow_up_red.png", 
    "content/img/sparkles/arrow_up_yellow.png", 
    "content/img/sparkles/arrow_up_blue.png",
    "content/img/sparkles/arrow_down_red.png", 
    "content/img/sparkles/arrow_down_yellow.png", 
    "content/img/sparkles/arrow_down_blue.png",
    "content/img/sparkles/arrow_right_red.png", 
    "content/img/sparkles/arrow_right_yellow.png", 
    "content/img/sparkles/arrow_right_blue.png"
]

// State
let sparkleId = 0;
let pageWidth = 0;
let pageHeight = 0;
let sparkles = [];
let spawnSparklesInterval = null;
let contentResizeObserver = null;

window.onresize = (e) => {
    recalculatePageResolution();
    if(pageWidth > 900) {
        spawnBackgroundEffects();
        return;
    }

    if(pageWidth <= 900) {
        clearInterval(spawnSparklesInterval);
        for(let i = 0; i < sparkles.length; i++)
            sparkles[i].shouldBeRemoved = true;
        spawnSparklesInterval = undefined;
    }
};

window.onload = () => {
    contentResizeObserver = new ResizeObserver(recalculatePageResolution);
    contentResizeObserver.observe(document.getElementById("content"));
    spawnBackgroundEffects();
}

function recalculatePageResolution() {
    const content = document.getElementById("content");
    if(!content || !document.body || !document.documentElement)
        return;

    pageWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, 
        document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
    pageHeight = Math.max(content.scrollHeight, content.offsetHeight);
}

function spawnBackgroundEffects() {
    recalculatePageResolution();
    if(pageWidth <= 900 || spawnSparklesInterval)
        return;


    for(let i = 0; i < INIT_SPARKLE_COUNT; i++)
        setTimeout(() => { createSparkle(true); }, i * INIT_SPARKLE_CREATE_INTERVAL);
    
    spawnSparklesInterval = setInterval(() => {
        if(!document.hidden)
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
    sparkleElement.setAttribute("unselectable", "on");
    sparkleElement.style.left = sparkle.x / pageWidth * 100 + "%";
    sparkleElement.style.top = sparkle.y + "px";
    if(sparkle.flip)
        sparkleElement.style.transform = "scaleX(-1)";
    pageWrapper.appendChild(sparkleElement);

    sparkle.interval = setInterval(() => { 
        if(!document.hidden)
            sparkleUpdate(sparkle, sparkleElement, pageWrapper);
    }, UPDATE_RATE);
}

function sparkleUpdate(sparkle, sparkleElement, pageWrapper) {
    sparkle.y += sparkle.speed;
    sparkle.speed += sparkle.accel;

    sparkleElement.style.top = sparkle.y + "px";
    if(sparkle.y > pageHeight - 2 * sparkle.width && !sparkle.timeoutSet) {
        sparkleElement.classList.add("removing-sparkle");
        sparkle.timeout = setTimeout(() => { 
            pageWrapper.removeChild(sparkleElement);
            sparkles.splice(sparkles.indexOf(sparkle), 1);
            clearInterval(sparkle.interval); 
            removed = true;
        }, REMOVING_ELEMENT_TIMEOUT);
        sparkle.timeoutSet = true;
    }

    if(sparkle.y > pageHeight - sparkle.width - 1 || sparkle.shouldBeRemoved) {
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

    let imageId = Math.floor(random(1, 3));
    if(imageId == 2) {
        imageId = Math.floor(random(2, IMAGES.length));
    }
    if(random(0, 1000000) < 1.0)
        imageId = 0;

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
        timeout: null,
        interval: null,
        shouldBeRemoved: false
    };
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}