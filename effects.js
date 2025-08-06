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

setInterval(spawnRaindrop, 30);

requestAnimationFrame(animateRaindrops);