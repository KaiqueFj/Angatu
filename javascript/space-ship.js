let canvas = document.getElementById("space-game");
let ctx = canvas.getContext("2d");

let t0 = new Date().getTime();
let t, deltaT;
var startGame = document.getElementById('Play')

let fps = 2;
let level = 1;

let score = 0


let image = new Image();
image.src = "./assets/space-ship/shipUp.jpeg";

let asteroid = new Image();
asteroid.src = "./assets/space-ship/meteor.gif"


const asteroide = {
    sizeAsteroid: 40,
    xAsteroid: 0,
    yAsteroid: 0
};

const Nave = {
    xSpaceship: Math.floor(canvas.width / 2),
    ySpaceship: Math.floor(canvas.height / 2),
    widthSpaceship: 50,
    heightSpaceship: 50,
    step: 10,
};

console.log(Nave.xSpaceship, Nave.ySpaceship);
console.log(Nave.widthSpaceship, Nave.heightSpaceship);


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newAsteroid(x, y) {
    ctx.fillRect(x, y, asteroide.sizeAsteroid, asteroide.sizeAsteroid);
    ctx.drawImage(asteroid, x, y, asteroide.sizeAsteroid, asteroide.sizeAsteroid);
}


function drawSpaceship() {
    ctx.drawImage(image, Nave.xSpaceship, Nave.ySpaceship, Nave.widthSpaceship, Nave.heightSpaceship);
}

function move(key) {
    switch (key.keyCode) {
        case 38:
            if (Nave.ySpaceship > Nave.step) {
                Nave.ySpaceship -= Nave.step;
            } else {
                Nave.ySpaceship = 0;
            }
            image.src = "./assets/space-ship/shipUp.jpeg";
            break;
        case 40:
            if (Nave.ySpaceship < canvas.height - Nave.step - Nave.heightSpaceship) {
                Nave.ySpaceship += Nave.step;
            } else {
                Nave.ySpaceship = canvas.height - Nave.heightSpaceship;
            }
            image.src = "./assets/space-ship/ship-down.jpeg";
            break;
        case 37:
            if (Nave.xSpaceship > Nave.step) {
                Nave.xSpaceship -= Nave.step;
            } else {
                Nave.xSpaceship = 0;
            }
            image.src = "./assets/space-ship/ship-left.jpeg";
            break;
        case 39:
            if (Nave.xSpaceship < canvas.width - Nave.step - Nave.widthSpaceship) {
                Nave.xSpaceship += Nave.step;
            } else {
                Nave.xSpaceship = canvas.width - Nave.widthSpaceship;
            }
            image.src = "./assets/space-ship/ship-right.jpeg";
            break;
    }
}




function detectColision(xSpaceship, ySpaceship, widthSpaceship, heightSpaceship, xAsteroid, yAsteroid, widthAsteroid, heightAsteroid) {

    if (((xSpaceship + widthSpaceship) > xAsteroid && (xAsteroid + widthAsteroid) > xSpaceship) && ((ySpaceship + heightSpaceship) > yAsteroid && (yAsteroid + heightAsteroid) > ySpaceship)) {
        console.log("Colision!");
        return true;
    } else {
        console.log("Safe");
        return false;
    }
}

function scoreboard(score, level) {
    ctx.font = '22px "Poppins"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';
    ctx.fillText(`Pontos:` + score, canvas.width - 780, canvas.height - 5);
    ctx.fillText(`Level:` + level, canvas.width - 780, canvas.height - 350);
}


function createScoreboard() {
    const scoreboard = {
        points: 0,
        level: 1,
        draw() {
            ctx.font = '0.97em "Press Start 2P"';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'white'
            ctx.fillText(`Pontos: ${scoreboard.points}`, canvas.width - 780, canvas.height - 5);
            ctx.fillText(`Level: ${scoreboard.level}`, canvas.width - 780, canvas.height - 350);
        },

        update() {
            const intervalToCalculate = 2;
            const afterInterval = 2 % intervalToCalculate === 0;

            if (afterInterval) {
                scoreboard.points = scoreboard.points + 1
                scoreboard.level = Math.floor(scoreboard.points / 5) + 1;
            }
        }

    }
    console.log(`${scoreboard.points}`)

    return scoreboard
}


function gameLoop() {

    const score = createScoreboard()

    clearCanvas();

    // add score
    score.draw()

    //draw the spaceship
    drawSpaceship();

    // create asteroids at random places
    newAsteroid(asteroide.xAsteroid, asteroide.yAsteroid);
    asteroide.xAsteroid = Math.floor(Math.random() * canvas.width);
    asteroide.yAsteroid = Math.floor(Math.random() * canvas.height);


    // check colision
    if (detectColision(Nave.xSpaceship, Nave.ySpaceship, Nave.widthSpaceship, Nave.heightSpaceship, asteroide.xAsteroid, asteroide.yAsteroid, asteroide.sizeAsteroid, asteroide.sizeAsteroid)) {
        GameOver();

    } else {
        score.update()


    }
    setTimeout(function () {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps);



}



function PlayStartButton() {
    let startContainer = document.getElementById("Start-container");
    let canvas = document.getElementById("space-game");
    let RestartContainer = document.getElementById("Restart-Container");


    startContainer.style.display = "none";
    canvas.style.display = "block";
    RestartContainer.style.display = "none";
    requestAnimationFrame(gameLoop)



}

function GameOver() {


    let RestartContainer = document.getElementById("Restart-Container");
    let canvas = document.getElementById("space-game");

    RestartContainer.style.display = "grid";
    canvas.style.display = "none";

}

function Restart() {

    let startContainer = document.getElementById("Start-container");
    let canvas = document.getElementById("space-game");
    let RestartContainer = document.getElementById("Restart-Container");
    RestartContainer.style.display = "none";

    startContainer.style.display = "none";
    canvas.style.display = "block";

}


window.onkeydown = move;   