class World {
    constructor() {
        this.friction = 0.00005 ;
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
                this.map.push(new Block1x1(4, 6, 10));
                this.map.push(new Block1x1(5, 6, 6));
                this.map.push(new Block1x1(6, 6, 6));
                this.map.push(new Block1x1(7, 6, 6));
                this.map.push(new Block1x1(8, 6, 6));
                this.map.push(new Block1x1(9, 6, 8));

                
                this.map.push(new Block1x1(0, 9, 10));
                this.map.push(new Block1x1(1, 9, 6));
                this.map.push(new Block1x1(2, 9, 6));
                this.map.push(new Block1x1(3, 9, 6));
                this.map.push(new Block1x1(4, 9, 6));
                this.map.push(new Block1x1(5, 9, 8));

                break;

            case 3: 
                // Clear map
                this.map = [];

                // Spawn ball
                this.worldspawn = util.Vec2(4.5 * 32, 12.5 * 32);
                ball.init(this.worldspawn); 

                // Add objs to map
                this.map.push(new Hole(4.5, 1.5, 3));
                this.map.push(new Block1x1(4.5, 7, 4));

                break;
        }
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
        this.pixpos = util.Vec2(0, 0);
        this.fx;
        this.fy;
    }

    update() {
        this.pixpos.x = this.x * this.size;
        this.pixpos.y = this.y * this.size;
        super.draw();
        this.drawShadow();
        this.collision();
    }

    drawShadow() {
        ctx.drawImage(tileSheet, (this.imgValue + 1) * tileSize, 0, tileSize, tileSize, this.pixpos.x, (this.y + 1) * this.size, 32, 32);
    }

    collision() {
        this.fx = ball.pos.x + ball.vel.x * world.DeltaTime;
        this.fy = ball.pos.y;
        if(this.fx <= (this.x * this.size) + this.size && this.fx + ball.size >= (this.x * this.size) && this.fy <= (this.y * this.size) + this.size && this.fy + ball.size >= (this.y * this.size)) {
            ball.pos.x += -ball.vel.x;
            ball.vel.x = -ball.vel.x;
        }
    
        this.fx = ball.pos.x;
        this.fy = ball.pos.y + ball.vel.y * world.DeltaTime;
        if(this.fx <= (this.x * this.size) + this.size && this.fx + ball.size >= (this.x * this.size) && this.fy <= (this.y * this.size) + this.size && this.fy + ball.size >= (this.y * this.size)) {
            ball.pos.y += -ball.vel.y;
            ball.vel.y = -ball.vel.y;
        }
    }
}

class DynamicBox {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.len = this.x2 - this.x1;
        this.height = this.y2 - this.y1; 
    }
}