class World {
    constructor() {
        this.friction = 0.000005;
        this.DeltaTime;
        this.currentWorld = 1;
        this.map = [];
        this.worldspawn = util.Vec2(0, 0);
    }

    renderMap() {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i].update();
        }
    }

    renderBG() {
        for (let i = 0; i < width / 32; i ++) {
            for(let j = 0; j < height / 32; j ++) {
                var isLightSquare = (i + j) % 2 != 0;
                var v = (isLightSquare) ? 1 : 0;                
                ctx.drawImage(tileSheet, v * tileSize, 0, tileSize, tileSize, i * 32, j * 32, 32, 32);
            }
        }
    }

    getWorld(world) {
        switch (world) {
            case 1: 
                // Clear map
                this.map = [];

                // Spawn ball
                this.worldspawn = util.Vec2(4.5 * 32, 12.5 * 32);
                ball.init(this.worldspawn); 

                // Add objs to map
                this.map.push(new Hole(4.5, 1.5, 3));
                this.map.push(new Block1x1(4.5, 7, 4));

                break;
            
            case 2: 
                // Clear map
                this.map = [];

                // Spawn ball
                this.worldspawn = util.Vec2(4.5 * 32, 12.5 * 32);
                ball.init(this.worldspawn);

                // Add objs to map
                this.map.push(new Hole(4.5, 1.5, 3));

                break;
        }
    }
}

class DynamicObject {
    constructor (x, y, xLen, yLen, tiles) {
        this.x = x;
        this.y = y;
        this.xLen = xLen;
        this.yLen = yLen;
        this.tiles = tiles;
    }
}

class Object {
    constructor (x, y, imgValue) {
        this.x = x;
        this.y = y;
        this.imgValue = imgValue;
    }

    draw() {
        ctx.drawImage(tileSheet, this.imgValue * tileSize, 0, tileSize, tileSize, this.x * 32, this.y * 32, 32, 32);
    }

    update(){}
}

class Hole extends Object {
    constructor(x, y, imgValue) {
        super(x, y, imgValue);
        this.size = 28;
    }

    update() {
        super.draw();
        this.checkForWin();
    }

    moveBallToHole() {
        if (ball.renderedSize >= 0) {
            ball.renderedSize -= 0.05 * world.DeltaTime;
        } else {
            world.currentWorld += 1
            world.getWorld(world.currentWorld);
            ball.win = false;
        }
    }

    checkForWin () {
        if(util.getDist(this.x * 32, this.y * 32, ball.pos.x, ball.pos.y) < 28) {
            ball.win = true;
            this.moveBallToHole();
        }
    }
}

class Block1x1 extends Object {
    constructor(x, y, imgValue) {
        super(x, y, imgValue);
        this.size = 32;
    }

    update() {
        super.draw();
        this.drawShadow();
        //ball.collisionRes(0, 0, width, height);
    }

    drawShadow() {
        ctx.drawImage(tileSheet, (this.imgValue + 1) * tileSize, 0, tileSize, tileSize, this.x * 32, (this.y + 1) * 32, 32, 32);
    }
}