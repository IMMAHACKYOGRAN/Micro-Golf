const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 512;
const width = canvas.width, height = canvas.height;

const util = new Util(); 
const ball = new Ball(10, 10, 0, 0);
const world = new World();
const gui = new Gui();
const tileSheet = new Image();
const tileSize = 80;
tileSheet.src = './img/Tiles.png';

let currentMousePos = util.Vec2(0, 0);
let startMousePos = util.Vec2(0, 0);
let gameIsRunning = false;

function drawBG() {
    ctx.fillRect(0, 0, width, height);
    world.renderBG();
    world.renderMap();
}

function render() {
    drawBG();
    ball.draw();
}

let lastTime = 0;
function gameLoop(time = 0) {
    mouse();
    if (gameIsRunning) {
        world.DeltaTime = time - lastTime;
        lastTime = time;

        ball.input();
        ball.move();
        ball.collisionRes(0, 0, width, height);
        
        render();
    }

    if (gui.startMenu.isOnStartScreen) {
        gui.startMenu.startScreen();
    }

    requestAnimationFrame(gameLoop);
}

function init() {
    world.getWorld(world.currentWorld);  
}

function mouse() {
    document.addEventListener("mousemove", e => {
        currentMousePos.x = e.x;
        currentMousePos.y = e.y;
    })
}

//init();
gui.startMenu.isOnStartScreen = true;
gameLoop();