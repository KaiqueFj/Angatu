var startGame = document.getElementById('Play')
let canvas = document.getElementById("invade-game");
let ctx = canvas.getContext("2d");


let fps = 2;
let activeScreen = {}

const Player = new Image();
Player.src = "./assets/invade/character.gif";

const Monster = new Image();
Monster.src = "./assets/invade/monster.gif";

const globals = {}

const player = {
    xPlayer: 0,
    yPlayer: canvas.height -100,
    widthPlayer: 120,
    heightPlayer: 120,
    step: 10,
    jump:4.6,
    gravity:0.25,
    speed :0
};

const monster = {
    sizeMonster: 120,
    xMonster: canvas.width-10,
    yMonster: canvas.height -100,
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
            if (player.yPlayer > player.step) {
                player.yPlayer-= player.step
            } 
            
            
            else {
                player.yPlayer= 0;
            }
           
    }
}


function detectColision(Xplayer,yPlayer,Xmonster,Ymonster) {

    if (Xplayer = Xmonster && yPlayer <= Ymonster  ) {
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

        heroJump() {
            
                player.speed =  - player.jump;
              
        },
        
        update() {
            const intervalToCalculate = 2;
            const afterInterval = 2 % intervalToCalculate === 0;

            if (afterInterval & monster.xMonster < canvas.width) {

              monster.xMonster = monster.xMonster - 100 
            }
        },

        drawMonster() {

            DrawVillain(monster.xMonster, monster.yMonster);
        },

        Colision() {
            if (detectColision(player.xPlayer, player.yPlayer, monster.xMonster, monster.yMonster)) {
                ChangeScreen(screens.GAME_OVER)
                return
            }
        },

    }
    
    player.speed = player.speed + player.gravity;
    player.yPlayer = player.yPlayer + player.speed;
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