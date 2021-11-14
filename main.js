const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 512;
const width = canvas.width, height = canvas.height;

const util = new Util(); 
const ball = new Ball(10, 10, 0, 0);
const world = new World();
const tileSheet = new Image();
const tileSize = 80;
tileSheet.src = './img/Tiles.png';


let currentMousePos = util.Vec2(0, 0);
let startMousePos = util.Vec2(0, 0);

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
function update(time = 0) {
    world.DeltaTime = time - lastTime;
    lastTime = time;

    ball.input();
    ball.move();
    ball.collisionRes(0, 0, width, height);
    
    render();

    requestAnimationFrame(update);
}

function init() {
    world.getWorld(world.currentWorld);  
}

init();
update();