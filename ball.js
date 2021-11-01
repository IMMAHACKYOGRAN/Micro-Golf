class Ball {
    constructor(x, y, velx, vely, img) {
        this.pos = util.Vec2(x, y);
        this.vel = util.Vec2(velx, vely);
        this.lastPos = util.Vec2(0, 0);
        this.onedvel = 0;
        this.onedlaucnedvel = 0;
        this.renderedSize = 32;
        this.img = img;
        this.mbd = false;
        this.win = false;
    }

    move() {
        this.vel.x = (this.onedvel / this.onedlaucnedvel) * this.vel.x;
        this.vel.y = (this.onedvel / this.onedlaucnedvel) * this.vel.y;

        if (!this.vel.x) {
            this.vel.x = 0;
        }

        if (!this.vel.y) {
            this.vel.y = 0;
        }

        if (this.win) {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        this.pos.x += this.vel.x * world.DeltaTime;
        this.pos.y += this.vel.y * world.DeltaTime;

        if (this.onedvel >= 0) {
            this.onedvel -= world.friction * world.DeltaTime;
        }
    }

    input() {
        document.addEventListener("mousemove", e => {
            currentMousePos.x = e.x;
            currentMousePos.y = e.y;
        })

        document.addEventListener("mousedown", () => {
            if (!this.mbd) {
                startMousePos.x = currentMousePos.x;
                startMousePos.y = currentMousePos.y;
                this.mbd = true;
            }
        });

        document.addEventListener("mouseup", () => {
            this.onedvel = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2))
            this.onedlaucnedvel = this.onedvel;
            this.vel.x = -(currentMousePos.x - startMousePos.x) * 0.005;
            this.vel.y = -(currentMousePos.y - startMousePos.y) * 0.005;
            this.mbd = false;
        });
    }

    draw() {
        ctx.drawImage(tileSheet, 2 * tileSize, 0, tileSize, tileSize, this.pos.x, this.pos.y, this.renderedSize, this.renderedSize);
    }
    
    init(pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        this.vel.x = 0;
        this.vel.y = 0;
    }

    colisionRes() {
        if (this.pos.x < 0 || this.pos.x + 28 > width) {
            while (this.pos.x < 0) {
                this.pos.x += -this.vel.x
            }

            while (this.pos.x + 28 > width) {
                this.pos.x += -this.vel.x
            }

            this.vel.x = -this.vel.x;
        }
    
        if (this.pos.y < 0 || this.pos.y + 28 > height) {
            while (this.pos.y < 0) {
                this.pos.y += -this.vel.y
            }

            while (this.pos.y + 28 > height) {
                this.pos.y += -this.vel.y
            }

            this.vel.y = -this.vel.y;
        }
    }
}