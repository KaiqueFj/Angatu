var startGame = document.getElementById('Play')
let canvas = document.getElementById("invade-game");
let ctx = canvas.getContext("2d");


let fps = 2;
let activeScreen = {}

const floor = new Image();
floor.src = "";

const Player = new Image();
Player.src = "./assets/invade/character.gif";

const Monster = new Image();
Monster.src = "./assets/invade/monster.png";

const globals = {}

const player = {
    xPlayer: 0,
    yPlayer: canvas.height - 100,
    widthPlayer: 120,
    heightPlayer: 120,
    step: 10,
};

const monster = {
    sizeMonster: 120,
    xMonster: canvas.width - 100,
    yMonster: canvas.height - 120,
};



function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function DrawPlayer() {
    ctx.drawImage(Player, player.xPlayer, player.yPlayer, player.widthPlayer, player.heightPlayer);
}
function DrawVillain(x, y) {
    ctx.fillRect(x, y, monster.sizeMonster, monster.sizeMonster);
    ctx.drawImage(Monster, x, y, monster.sizeMonster, monster.sizeMonster);
}


console.log(monster.xMonster, monster.yMonster)

function move(key) {
    switch (key.keyCode) {
        case 38:
            if (player.yPlayer > canvas.height - 240) {
                player.yPlayer = player.yPlayer - 30
            }

            else {
                player.yPlayer = canvas.height - 100;
            }

    }
}

function createFloor() { 

}


function detectColision(Xplayer, yPlayer, Xmonster, yMonster) {

    if (Xplayer >= Xmonster && yPlayer <= yMonster) {
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
        drawPlayer() {
            ctx.drawImage(Player, player.xPlayer, player.yPlayer, player.widthPlayer, player.heightPlayer);
        },


        update() {
            const intervalToCalculate = 2;
            const afterInterval = 2 % intervalToCalculate === 0;

            if (afterInterval) {

                monster.xMonster = monster.xMonster - 100

            }
        },

        drawMonster() {

            DrawVillain(monster.xMonster, monster.yMonster);
            if (monster.xMonster > canvas.width) {
                monster.xMonster = canvas.width - 100
            }
        },

        Colision() {
            if (detectColision(player.xPlayer, player.yPlayer, monster.xMonster, monster.yMonster)) {
                ChangeScreen(screens.GAME_OVER)
                return
            }
        },

    }


    return createGame

}


function createIntroPage() {
    const firstScreen = {
        draw() {
            let startContainer = document.getElementById("Start-container");
            let canvas = document.getElementById("invade-game");
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
    let canvas = document.getElementById("invade-game");
    let GameOverContainer = document.getElementById("GameOver-Container");


    startContainer.style.display = "none";
    GameOverContainer.style.display = "none";
    canvas.style.display = "block";


}

function GameOver() {


    let GameOverContainer = document.getElementById("GameOver-Container");
    let canvas = document.getElementById("invade-game");

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
            globals.game = CreateGameplay();

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
        globals.game.update();

    },
    draw() {
        clearCanvas()

        globals.scoreboard.draw();
        globals.game.drawMonster();
        globals.game.drawPlayer();
        globals.game.Colision()
    },
};

screens.GAME_OVER = {
    draw() {
        GameOver()
    },
    update() {
        globals.game.update()

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