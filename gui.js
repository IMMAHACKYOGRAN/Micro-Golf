class GuiButton {
    constructor(imgSx, imgSy, redirect, px, py, width) {
        this.imgSx = imgSx;
        this.width = width;
        this.imgSy = imgSy;
        this.pos = util.Vec2(px, py);
    }

    update() {
        this.draw();
    }

    draw() {
        ctx.drawImage(tileSheet, this.imgSx, this.imgSy, this.width, 96, this.px, this.py, this.width, 96);
    }
}

class StartMenu {
    constructor() {
        this.isOnStartScreen = false;
        this.startButton = new GuiButton(0, 175, null, 72, 249, 176);
        //this.levelButton = new GuiButton();
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
        this.startButton.draw();
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