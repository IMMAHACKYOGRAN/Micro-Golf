class Ball {
    constructor(x, y, velx, vely) {
        this.pos = util.Vec2(x, y);
        this.vel = util.Vec2(velx, vely);
        this.lastPos = util.Vec2(0, 0);
        this.onedvel = 0;
        this.size = 28;
        this.onedlaucnedvel = 0;
        this.renderedSize = 32;
        this.mbd = false;
        this.win = false;
        this.maxSpeed = 0.3;
    }

    move() {
        this.vel.x = (this.onedvel / this.onedlaucnedvel) * this.vel.x;
        this.vel.y = (this.onedvel / this.onedlaucnedvel) * this.vel.y;

        if (!this.vel.x)
            this.vel.x = 0;

        if (!this.vel.y)
            this.vel.y = 0;

        if (this.win) {
            this.vel.x = 0;
            this.vel.y = 0;
        }
        
        this.limitSpeed(this.vel);

        this.pos.x += this.vel.x * world.DeltaTime;
        this.pos.y += this.vel.y * world.DeltaTime;

        if (this.onedvel >= 0) {
            this.onedvel -= world.friction * world.DeltaTime;
       }
    //    console.log(this.vel);
    }

    limitSpeed(vel) {
        if(vel.x > 1) {
            vel.x = 0.5;
        } if(vel.y > 1) {
            vel.y = 0.5;
        } if(vel.x < -1) {
            vel.x = -0.5;
        } if(vel.y < -1) {
            vel.y = -0.5;
        }
    }

    input() {
        document.addEventListener("mousedown", () => {
            if (!this.mbd) {
                startMousePos.x = currentMousePos.x;
                startMousePos.y = currentMousePos.y;
                this.mbd = true;
            }
        });

        document.addEventListener("mouseup", () => {
            this.onedvel = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2));
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
        this.renderedSize = 32;
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        this.vel.x = 0;
        this.vel.y = 0;
    }

    collisionRes(x, y, sizeX, sizeY) {
        if (this.pos.x < x || this.pos.x + 28 > x + sizeX) {
            if (this.pos.x < x) {
                this.pos.x += -this.vel.x * world.DeltaTime;
            }

            if (this.pos.x + 28 > x + sizeX) {
                this.pos.x += -this.vel.x * world.DeltaTime;
            }

            this.vel.x = -this.vel.x;
        }
    
        if (this.pos.y < y || this.pos.y + 28 > y + sizeY) {
            if (this.pos.y < y) {
                this.pos.y += -this.vel.y * world.DeltaTime;
            }

            if (this.pos.y + 28 > y + sizeY) {
                this.pos.y += -this.vel.y * world.DeltaTime;
            }

            this.vel.y = -this.vel.y;
        }
    }
}