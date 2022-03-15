class GuiButton {
    constructor(imgSx, imgSy, animSx, redirect, px, py, width) {
        this.imgSx = imgSx;
        this.imgSy = imgSy;
        this.animSx = animSx;
        this.sxToDraw = this.imgSx;
        this.width = width;
        this.redirect = redirect;
        this.pos = util.Vec2(px, py);
    }

    update() {
        this.interact();
        this.draw();
    }

    draw() {
        ctx.drawImage(tileSheet, this.sxToDraw, this.imgSy, this.width, 96, this.pos.x, this.pos.y, this.width, 96);
    }

    interact() {
        document.addEventListener("mousedown", () => {
            if (currentMousePos.x > this.pos.x && currentMousePos.x < this.pos.x + this.width && currentMousePos.y < this.pos.y + 96 && currentMousePos.y > this.pos.y) {
                this.sxToDraw = this.animSx;
            } 
        });

        document.addEventListener("mouseup", () => {
            if (currentMousePos.x > this.pos.x && currentMousePos.x < this.pos.x + this.width && currentMousePos.y < this.pos.y + 96 && currentMousePos.y > this.pos.y) {
                this.sxToDraw = this.imgSx;
                this.redirect()
            }
        });
    }
}

class StartMenu {
    constructor() {
        this.isOnStartScreen = false;
        this.startButton = new GuiButton(0, 80, 176, function() {this.isOnStartScreen = false; gameIsRunning = true; world.getWorld(world.currentWorld); }, 72, 249, 176);
        this.levelButton = new GuiButton(352, 80, 432, null, 72, 347, 80);
        this.placeHolderButton = new GuiButton(352, 80, 432, null, 168, 347, 80);
    }

    render() {
        // --------------- Draw BG ---------------
        for (let i = 0; i < width / 32; i ++) {
            for (let j = 0; j < height / 32; j ++) {
                var isLightSquare = (i + j) % 2 != 0;
                var v = (isLightSquare) ? 1 : 0;
                ctx.drawImage(tileSheet, v * tileSize, 0, tileSize, tileSize, i * 32, j * 32, 32, 32);
            }
        }

        // --------------- Draw Buttons ---------------
        this.startButton.update();
        this.levelButton.update();
        this.placeHolderButton.update();
    }

    startScreen() {
        this.render();
    }
}

class Gui {
    constructor() {
        this.startMenu = new StartMenu();
    }

}