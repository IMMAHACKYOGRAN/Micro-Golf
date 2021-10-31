class World {
    constructor() {
        this.friction = 0.000005;
        this.DeltaTime;

        //maps
        this.map = new Array(0);
    }

    renderMap() {
        for (let i = 0; i < this.map.length; i++) {
            this.map[i].update(ball.pos);
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

    getMapOneOne() {
        // Clear map
        this.map = new Array(0);

        // Spawn ball
        let startpos = util.Vec2(0, 0);
        ball.init(startpos);

        // Add objs to map
        this.map.push(new Hole(1, 1, 3));
    }
}

class Object {
    constructor(x, y, imgValue) {
        this.x = x;
        this.y = y;
        this.imgValue = imgValue;
    }

    draw() {
        ctx.drawImage(tileSheet, this.imgValue * tileSize, 0, tileSize, tileSize, this.x * 32, this.y * 32, 32, 32);
    }

    update() {

    }
}

class Hole extends Object {
    constructor(x, y, imgValue) {
        super(x, y, imgValue);
        // this.nextMap = nextMap;
        this.size = 32;
    }

    update() {
        super.draw();
        this.checkForWin();
    }

    checkForWin () {
        if() {
                console.log("in");
            }
    }
}