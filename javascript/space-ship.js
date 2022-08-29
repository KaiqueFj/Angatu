var startGame = document.getElementById('Play')
let canvas = document.getElementById("space-game");
let ctx = canvas.getContext("2d");
let t0 = new Date().getTime();

let t, deltaT;
let fps = 2;
let activeScreen = {}

let image = new Image();
image.src = "./assets/space-ship/shipUp.jpeg";

const asteroid = new Image();
asteroid.src = "./assets/space-ship/meteor.gif"

const globals = {}

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
            ctx.textAlign = 'start';
            ctx.fillStyle = 'white'
            ctx.fillText(`Level: ${this.level}`, 20, 30);
            ctx.fillText(`Pontos: ${this.points}`, 20, canvas.height - 40);
        },
        update() {
            const intervalToCalculate = 2;
            const afterInterval = 2 % intervalToCalculate === 0;

            if (afterInterval) {
                this.points = this.points + 1
                this.level = Math.floor(this.points / 5) + 1;
                fps = 1 + this.level * 0.5;
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

        update() {
            asteroide.xAsteroid = Math.floor(Math.random() * canvas.width);
            asteroide.yAsteroid = Math.floor(Math.random() * canvas.height);
        },

        drawNewAsteroid() {

            newAsteroid(asteroide.xAsteroid, asteroide.yAsteroid);
        },

        Colision() {
            if (detectColision(Nave.xSpaceship, Nave.ySpaceship, Nave.widthSpaceship, Nave.heightSpaceship, asteroide.xAsteroid, asteroide.yAsteroid, asteroide.sizeAsteroid, asteroide.sizeAsteroid)) {
                ChangeScreen(screens.GAME_OVER)
                return
            }
        }

    }
    return createGame
}

function createIntroPage() {
    const firstScreen = {
        draw() {
            let startContainer = document.getElementById("Start-container");
            let canvas = document.getElementById("space-game");
            let GameOverContainer = document.getElementById("GameOver-Container");

            startContainer.style.display = "grid";
            canvas.style.display = "none";
            GameOverContainer.style.display = "none";

        }

    }
    return firstScreen;
}



function PlayStartButton() {
    let startContainer = document.getElementById("Start-container");
    let canvas = document.getElementById("space-game");
    let GameOverContainer = document.getElementById("GameOver-Container");


    startContainer.style.display = "none";
    GameOverContainer.style.display = "none";

    canvas.style.display = "block";


}

function GameOver() {


    let GameOverContainer = document.getElementById("GameOver-Container");
    let canvas = document.getElementById("space-game");

    GameOverContainer.style.display = "grid";
    canvas.style.display = "none";

}



function ChangeScreen(Newscreen) {
    activeScreen = Newscreen

    if (activeScreen.start) {
        activeScreen.start();
    }
}


const screens = {
    Begin: {
        start() {
            globals.Begin = createIntroPage()
            globals.Spaceship = CreateGameplay();

        },

        draw() {
            clearCanvas()
            globals.Begin.draw()

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

    update() {

        globals.scoreboard.update();
        globals.Spaceship.update();

    },
    draw() {
        clearCanvas()

        globals.scoreboard.draw();
        globals.Spaceship.drawNewAsteroid();
        globals.Spaceship.drawSpaceship();
        globals.Spaceship.Colision()
    },
};

screens.GAME_OVER = {
    draw() {
        GameOver()
    },
    update() {
        globals.Spaceship.update()

    },
    click() {
        ChangeScreen(screens.Begin);
    }
}


function gameLoop() {

    activeScreen.draw();
    activeScreen.update();

    setTimeout(function () {
        requestAnimationFrame(gameLoop);
    }, 1000 / fps);
}

window.addEventListener('click', function () {
    if (activeScreen.click) {
        activeScreen.click();
    }
});



window.onkeydown = move;
ChangeScreen(screens.Begin)
gameLoop()