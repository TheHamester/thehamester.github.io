let sparkleId = 0;
let pageWidth = 0;
let pageHeight = 0;
let images = ["img/HamesterIcon.png", "img/HamesterIcon2.png", "img/HamesterIcon3.png"];
let sparkles = [];

function spawnBackgroundEffects() {
    pageWidth = Math.max( document.body.scrollWidth, document.body.offsetWidth, 
        document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth );
    pageHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

    for(let i = 0; i < 10; i++)
        setTimeout(() => { createSparkle(true); }, i * 20);
    

    setInterval(() => {
        setTimeout(() => { createSparkle(false); }, parseInt(Math.floor(Math.random() * 1000)))
    }, 500);
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
    sparkleElement.setAttribute("src", images[sparkle.imageId]);
    sparkleElement.setAttribute("draggable", false);
    sparkleElement.style.left = sparkle.x / pageWidth * 100 + "%";
    sparkleElement.style.top = sparkle.y + "px";
    pageWrapper.appendChild(sparkleElement);

    let timeoutSet = false;
    let removed = false;
    let timeout = undefined;
    const interval = setInterval(() => { 
        sparkle.y += sparkle.speed;
        sparkle.speed += sparkle.accel;
        //sparkle.rotation += sparkle.rotationSpeed;
        sparkleElement.style.top = sparkle.y / pageHeight * 100 + "%";
        sparkleElement.style.transform = "rotate(" + sparkle.rotation + "deg)";
        if(sparkle.y > pageHeight - 2 * sparkle.width && !timeoutSet) {
            sparkleElement.classList.add("removing-sparkle");
            timeout = setTimeout(() => { 
                pageWrapper.removeChild(sparkleElement);
                sparkles.splice(sparkles.indexOf(sparkle), 1);
                clearInterval(interval); 
                removed = true;
            }, 1100);
            timeoutSet = true;
        }

        if(sparkle.y > pageHeight - sparkle.width - 1 && !removed) {
            pageWrapper.removeChild(sparkleElement);
            sparkles.splice(sparkles.indexOf(sparkle), 1);
            if(timeout)
                clearTimeout(timeout);
            removed = true;
        }

    }, 16);

    return sparkleElement;
}

function createSparkleObject(setRandomHeight) {
    const width = random(50, 200);
    const x = sparkleId % 2 == 0 ? random(width + 1, pageWidth / 2 - 250) : random(pageWidth / 2 + 250, pageWidth - width - 1);
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