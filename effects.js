// Falling Raindrop Effect:
const raindropsrc = "Assets/raindrop.webp";
const raindrops = [];

let score = 0;

function updateScoreDsiplay() {
    document.getElementById('score-display').textContent = `Score: ${score}`;
}

function spawnRaindrop() {
    const droplet = document.createElement('img');
    droplet.src = raindropsrc;
    droplet.className = "raindrop";

    const drop = {
        el: droplet,
        x: Math.random() * window.innerWidth,
        y: 0,
        velocity: 0,
        gravity: Math.random() * (0.4 - 0.08) + 0.08
    };

    droplet.style.left = drop.x + 'px';
    droplet.style.top = drop.y + 'px';

    droplet.addEventListener('click', () => {
        score++;
        updateScoreDsiplay();

        // fade droplet out before removing
        droplet.classList.add('collected');
        setTimeout(() => {
            droplet.remove();
            const index = raindrops.indexOf(drop);
            if (index > -1) raindrops.splice(index, 1);
        }, 300);
    });

    document.body.appendChild(droplet);
    raindrops.push(drop);
}

function animateRaindrops() {
    for (let i = raindrops.length - 1; i >= 0; i--) {
        const currentDroplet = raindrops[i];
        currentDroplet.velocity += currentDroplet.gravity;
        currentDroplet.y += currentDroplet.velocity;
        currentDroplet.el.style.top = currentDroplet.y + 'px';

        if (currentDroplet.y > window.innerHeight) {
            currentDroplet.el.remove();
            raindrops.splice(i, 1);
        }
    }
    requestAnimationFrame(animateRaindrops);
}

// Floating cloud effect
const floatingClouds = document.querySelectorAll('.floating-cloud');
let cloudPositions = [];
const cloudSpeed = 1.75;
const cloudPadding = window.screen.width * 0.09;
if (document.querySelectorAll('.floating-cloud').length > 0) {

    document.querySelectorAll('.floating-cloud').forEach(cloud => {
        const img = cloud.querySelector('img');
        const text = cloud.querySelector('.cloud-text');
        text.textContent = img.alt;
    });

    // Cloud loop animation
    function animateClouds() {
        floatingClouds.forEach((cloud, i) => {
            cloudPositions[i] -= cloudSpeed;
            // loop the cloud back to the other side of the screen
            if (cloudPositions[i] <= -cloud.offsetWidth) {
                const maxX = Math.max(...cloudPositions);
                cloudPositions[i] = maxX + cloud.offsetWidth + cloudPadding;
            }
            cloud.style.left = cloudPositions[i] + 'px';
        });
        requestAnimationFrame(animateClouds);
    }
}

// Scrolling skills effect
if (document.querySelectorAll('.skill').length > 0) {
    const allSkills = document.querySelector('.all-skills');
    let skillPositions = [];
    const skillElements = Array.from(allSkills.children);

    const skillSpeed = 0.6;
    const skillPadding = allSkills.offsetWidth * 0.07; // matches css gap

    // Setting initial skill positions
    function initSkills() {
        let currentX = 0;
        skillElements.forEach((skill, i) => {
            skill.style.position = 'absolute';
            skill.style.left = currentX + 'px';
            skillPositions[i] = currentX;
            currentX += skill.offsetWidth + skillPadding;
        });
    }

    // Skill loop animation
    function animateSkills() {
        const containerWidth = document.querySelector('.skill-bar').offsetWidth;
        skillElements.forEach((skill, i) => {
            skillPositions[i] += skillSpeed;
            // loop the skill back to the other side of the skill bar
            if (skillPositions[i] > containerWidth) {
                const minPos = Math.min(...skillPositions);
                skillPositions[i] = minPos - skill.offsetWidth - skillPadding;
            }
            skill.style.left = skillPositions[i] + 'px';
        });

        requestAnimationFrame(animateSkills);
    }
}

// Fade in effect
function fadeIn(elementOrId) {
    const element = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
    if (!element) return;

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
    if (document.querySelectorAll('.floating-cloud').length > 0) {
        floatingClouds.forEach((cloud, i) => {
            const startX = i * (cloud.offsetWidth + cloudPadding);
            cloud.style.left = startX + 'px';
            cloudPositions[i] = startX;

            fadeIn(cloud);
        });
        animateClouds();
    }
    if (document.querySelectorAll('.skill').length > 0) {
        const skillBar = document.querySelector('.skill-bar');
        fadeIn(skillBar);
        initSkills();
        animateSkills();
    }
    const emailBar = document.querySelector('.email-bar');
    if (emailBar) {
        fadeIn(emailBar);
    }
});

// OG: 25 interval, 7% size, change the speed
setInterval(spawnRaindrop, 36);

requestAnimationFrame(animateRaindrops);