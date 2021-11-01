const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 512;
const width = canvas.width, height = canvas.height

const util = new Util(); 
const world = new World();
const ball = new Ball(10, 10, 0, 0, null);
const tileSheet = new Image();
const tileSize = 80;
tileSheet.src = './img/Tiles.png';


let currentMousePos = util.Vec2(0, 0)
let startMousePos = util.Vec2(0, 0)

function drawBG() {
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
    ball.colisionRes();
    
    render();

    requestAnimationFrame(update);
}

function init() {
    world.getWorld(world.currentWorld);  
}

init();
update();
