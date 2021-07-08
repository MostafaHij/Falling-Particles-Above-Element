const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight;



let particlesArr = [];
const titleElement = document.getElementById('title');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10,
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.weight = Math.random() * 1 + 1;
        this.directionX = - 2;
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;

        // Check for collision between each particle and title element.
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            this.weight *= -0.5;
        }
    }

    draw() {
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


function init() {
    particlesArr = [];
    for (let i = 0; i < 300; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArr.push(new Particle(x, y));
    }
}
init();

function animate() {

    //ctx.clearReact(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(255,215,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();
    }


    requestAnimationFrame(animate)
}
animate();


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10,
    }
    init();
});