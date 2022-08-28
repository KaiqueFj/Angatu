var startGame = document.getElementById('Play')
let canvas = document.getElementById("space-game");
let ctx = canvas.getContext("2d");
let t0 = new Date().getTime();
let t, deltaT;
let fps = 2;

let image = new Image();
image.src = "./assets/space-ship/shipUp.jpeg";

const asteroid = new Image();
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


function createScoreboard() {
    const scoreboard = {
        points: 0,
        level: 1,
        draw() {
            ctx.font = '0.97em "Press Start 2P"';
            ctx.textAlign = 'left';
            ctx.fillStyle = 'white'
            ctx.fillText(`Pontos: ${this.points}`, canvas.width - 780, canvas.height - 5);
            ctx.fillText(`Level: ${this.level}`, canvas.width - 780, canvas.height - 350);
        },
        update() {
            const intervalToCalculate = 2;
            const afterInterval = 2 % intervalToCalculate === 0;

            if (afterInterval) {
                this.points = this.points + 1
                this.level = Math.floor(this.points / 5) + 1;
            }
        },

    }
    console.log(this.points)
    return scoreboard
}

function CreateGameplay() {
    const createGame = {
        drawSpaceship() {
            ctx.drawImage(image, Nave.xSpaceship, Nave.ySpaceship, Nave.widthSpaceship, Nave.heightSpaceship);
        },

        drawNewAsteroid() {
            asteroide.xAsteroid = Math.floor(Math.random() * canvas.width);
            asteroide.yAsteroid = Math.floor(Math.random() * canvas.height);
            newAsteroid(asteroide.xAsteroid, asteroide.yAsteroid);
        },

        Colision() {
            if (detectColision(Nave.xSpaceship, Nave.ySpaceship, Nave.widthSpaceship, Nave.heightSpaceship, asteroide.xAsteroid, asteroide.yAsteroid, asteroide.sizeAsteroid, asteroide.sizeAsteroid)) {
                GameOver();

            }
        }

    }



    return createGame
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

const globals = {}
let activeScreen = {}

function ChangeScreen(Newscreen) {
    activeScreen = Newscreen

    if (activeScreen.start) {
        activeScreen.start();
    }
}


const screens = {
    Begin: {
        start() {
            globals.Spaceship = CreateGameplay();
            clearCanvas();


        },

        draw() {


        },
        click() {
            ChangeScreen(screens.GAMEPLAY);
        },
        update() {

        }

    }
};

screens.GAMEPLAY = {
    start() {
        globals.scoreboard = createScoreboard();
    },
    
    draw() {
        globals.scoreboard.draw();
        globals.Spaceship.drawNewAsteroid();
        globals.Spaceship.drawSpaceship();
    },
    update() {
        globals.scoreboard.update();
        globals.Spaceship.drawNewAsteroid();
        globals.Spaceship.drawSpaceship();
    },
};

screens.GAME_OVER = {
    draw() {
        GameOver()
    },
    update() {

    },
    click() {
        ChangeScreen(screens.Begin);
    }
}


function gameLoop() {

    activeScreen.draw();
    activeScreen.update();

        requestAnimationFrame(gameLoop);
    
}

window.addEventListener('click', function () {
    if (activeScreen.click) {
        activeScreen.click();
    }
});



window.onkeydown = move;
ChangeScreen(screens.Begin)
gameLoop()