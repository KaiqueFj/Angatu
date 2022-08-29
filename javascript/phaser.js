var startGame = document.getElementById('Play')
let canvas = document.getElementById("gameteste");
let ctx = canvas.getContext("2d");

let fps = 2;
let activeScreen = {}

const Boyimage = new Image();
Boyimage.src = "./assets/space-ship/shipUp.jpeg";

const monster = new Image();
monster.src = "./assets/space-ship/meteor.gif"

const groundImage = new Image();
groundImage.src = "./assets/Phaser/ground.jpeg"

const globals = {}

const Boy = {
   x:30,
   y:canvas.width -114,
    boyWidth: 50,
    BoyHeight: 50,
    step: 10,
};

const Monster = {
    x:70,
    y:canvas.width-114,
    size:30
};


function CreateGround() {
    const ground = {
        positionX: 0,
        positionY: 610,
        width: 224,
        height: 112,
        x: 0,
        y: canvas.height - 112,
        update() {
            const groudMoviment = 1;
            const repeat = ground.largura / 2;
            const movement = ground.x - groudMoviment;

            // console.log('[chao.x]', chao.x);
            // console.log('[repeat]',repeat);
            // console.log('[moviment]', moviment % repeat);

            ground.x = movement % repeat;
        },
        desenha() {
            ctx.drawImage(
                this.positionX,
                this.positionX, this.positionY,
                this.width, this.height,
                this.x, this.y,
                this.width, this.height,
            );

            ctx.drawImage(
                groundImage,
                this.positionX, this.positionY,
                this.width, this.height,
                (this.x + this.width), this.y,
                this.width, this.height,
            );
        },
    };
    return ground;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function drawBoy() {
    ctx.drawImage(Boyimage, Boy.x, Boy.y, Boy.boyWidth, Boy.BoyHeight);
}

function newMonster(x, y) {
    ctx.fillRect(x, y, Monster.size, Monster.size);
    ctx.drawImage(monster, x, y, Monster.size, monster.size);
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