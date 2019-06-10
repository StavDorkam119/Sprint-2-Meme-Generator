'use strict';

let gBackGroundCanvas, gBackgroundCtx, balls, mouse, colors, minRadius, maxRadius;

function initBackground() {
    // debugger;
    gBackGroundCanvas = document.getElementById('background-balls');
    gBackgroundCtx = gBackGroundCanvas.getContext('2d');
    gBackGroundCanvas.width = window.innerWidth;
    gBackGroundCanvas.height = window.innerHeight;
    colors = ['#00b950', '#0946bf', '#1e354c', '#e3e7d3', '#bdc2bf'];
    mouse = {};
    minRadius = 3;
    maxRadius = 40;
    window.addEventListener('resize', () => {
        gBackGroundCanvas.width = window.innerWidth;
        gBackGroundCanvas.height = window.innerHeight;
        createBalls();
    });
    window.addEventListener('mousemove', ev => {mouse.x = ev.x; mouse.y = ev.y});
    createBalls();
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    gBackgroundCtx.clearRect(0 ,0 , gBackGroundCanvas.width, gBackGroundCanvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }
}


function Circle (x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.interactiveRadius = function() {
        if (Math.abs(this.x - mouse.x) < 50 && Math.abs(this.y - mouse.y) < 50) {
            if (this.radius <= maxRadius) ++this.radius;
        } else if (this.radius > minRadius) --this.radius;
    }

    this.draw = function() {
        gBackgroundCtx.beginPath();
        gBackgroundCtx.arc(this.x, this.y, this.radius, Math.PI*2, false);
        gBackgroundCtx.fillStyle = color
        gBackgroundCtx.fill();
    }

    this.update = function() {
        if (this.x + this.radius >= gBackGroundCanvas.width || this.x - this.radius < 0) {
            this.dx *= -1;
            
        }
        if (this.y + this.radius >= gBackGroundCanvas.height || this.y - this.radius < 0) {
            this.dy *= -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        if(window.innerWidth >= 672) this.interactiveRadius();
        this.draw();
    }
}

function createBalls() {
    balls = [];
    for (let i = 0; i < 200; i++) {
        let x = getRandomInt(minRadius, gBackGroundCanvas.width - minRadius);
        let y = getRandomInt(minRadius, gBackGroundCanvas.height - minRadius);
        let noSpeed = true;
        let dx, dy;
        while (noSpeed) {
            dx = getRandomInt(0, 5) - 2;
            dy = getRandomInt(0, 5) - 2;
            if (dx !== 0 && dy !== 0) noSpeed = false;
        }
        let color = colors[getRandomInt(0, colors.length)];
        let ball = new Circle (x, y, dx, dy, minRadius, color);
        balls.push(ball);
    }
}