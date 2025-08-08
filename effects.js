// Falling Raindrop Effect:

const raindropsrc = "Assets/raindrop.webp";

const raindrops = [];

function spawnRaindrop() {
    const droplet = document.createElement('img');
    droplet.src = raindropsrc;
    droplet.className = "raindrop";

    const drop = {
        this: droplet,
        x: Math.random() * window.innerWidth,
        y: 0,
        velocity: 0,
        gravity: Math.random() * (0.4 - 0.1) + 0.1
    };

    droplet.style.left = drop.x + 'px';
    droplet.style.top = drop.y + 'px';

    document.body.appendChild(droplet);
    raindrops.push(drop);
}

function animateRaindrops() {
    for (let i = raindrops.length - 1; i >= 0; i--) {
        const currentDroplet = raindrops[i];
        currentDroplet.velocity += currentDroplet.gravity;
        currentDroplet.y += currentDroplet.velocity;
        currentDroplet.this.style.top = currentDroplet.y + 'px';

        if (currentDroplet.y > window.innerHeight) {
            currentDroplet.this.remove();
            raindrops.splice(i, 1);
        }
    }
    requestAnimationFrame(animateRaindrops);
}

const floatingClouds = document.querySelectorAll('.floating-cloud');
let cloudPositions = [];

function animateClouds() {
    const speed = 1;

    floatingClouds.forEach((cloud, i) => {
        cloudPositions[i] -= speed;
        if (cloudPositions[i] <= -cloud.offsetWidth) {
            // loop the cloud back to the others side of the screen
            const maxX = Math.max(...cloudPositions);
            cloudPositions[i] = maxX + cloud.offsetWidth;
        }
        cloud.style.left = cloudPositions[i] + 'px';
    });
    requestAnimationFrame(animateClouds);
}


function fadeIn(elementID) {
    const element = document.getElementById(elementID);
    let opacity = 0;
    element.style.opacity = 0;
    element.style.transition = 'opacity 2s ease-in';
    requestAnimationFrame(() => {
        element.style.opacity = 0.9;
    });
}

// call functions
const backgroundImage = new Image();
backgroundImage.src = "Assets/background.png";
backgroundImage.onload = function () {
    fadeIn('top-cloud');
}

window.addEventListener('load', () => {
    floatingClouds.forEach((cloud, i) => {
        const startX = i * cloud.offsetWidth;
        cloud.style.left = startX + 'px';
        cloudPositions[i] = startX;
    });
    animateClouds();
});

setInterval(spawnRaindrop, 25);

requestAnimationFrame(animateRaindrops);