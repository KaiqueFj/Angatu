var startGame = document.getElementById('Play')
let canvas = document.getElementById("invade-game");
let ctx = canvas.getContext("2d");


let fps = 2;
let activeScreen = {}

const Floor = new Image();
Floor.src = "./assets/invade/ground2.jpg";

const Player = new Image();
Player.src = "./assets/invade/character.gif";

const Monster = new Image();
Monster.src = "./assets/invade/monster2.gif";

const globals = {}

const player = {
    xPlayer: 0,
    yPlayer: canvas.height - 167,
    widthPlayer: 120,
    heightPlayer: 120,
    step: 10,
};

const monster = {
    sizeMonster: 120,
    xMonster: canvas.width - 100,
    yMonster: canvas.height -188,
};



function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function DrawPlayer() {
    ctx.drawImage(Player, player.xPlayer, player.yPlayer, player.widthPlayer, player.heightPlayer);
}
function DrawVillain(x, y) {
    ctx.fillRect( Monster, x, y, monster.sizeMonster, monster.sizeMonster);
    ctx.drawImage(Monster, x, y, monster.sizeMonster, monster.sizeMonster);
}


console.log(monster.xMonster, monster.yMonster)

function move(key) {
    switch (key.keyCode) {
        case 38:
            if (player.yPlayer > canvas.height - 270) {
                player.yPlayer = player.yPlayer - 30
            }

            else {
                player.yPlayer =  canvas.height - 167
            }

    }
}

function createFloor() {
    const floor = {
        spriteX: 0,
        spriteY: 0,
        width: 800,
        height: 80,
        x: 0,
        y: canvas.height -70,

        update() {
            const movementOfloor = 1;
            const repeat = floor.width / 200;
            const movement = floor.x - movementOfloor;

            floor.x = movement % repeat

            console.log("criando chão")
            console.log(floor.x)
            console.log(floor.y)
        },

        draw() {
            ctx.drawImage(
            Floor,
            floor.x, floor.y,
            floor.width, floor.height
            )
        }

    }

    return floor

}


function detectColision(Xplayer, yPlayer, Xmonster, yMonster) {

    if (Xplayer >= Xmonster) {
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
            ctx.fillText(`Pontos: ${this.points}`, canvas.width - 180, 30);
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

                monster.xMonster = monster.xMonster - 20

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
            globals.floor = createFloor()

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
        globals.floor.update();

    },
    draw() {
        clearCanvas()
        globals.scoreboard.draw();
        globals.floor.draw();
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