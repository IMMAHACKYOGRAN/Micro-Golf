class GuiButton {
    constructor(imgSx, imgSy, animSx, px, py, width) {
        this.imgSx = imgSx;
        this.imgSy = imgSy;
        this.animSx = animSx;
        this.sxToDraw = this.imgSx;
        this.width = width;
        this.pos = util.Vec2(px, py);
        this.isMouseDown = false;
    }

    update() {
        this.interact();
        this.draw();
    }

    draw() {
        ctx.drawImage(tileSheet, this.sxToDraw, this.imgSy, this.width, 96, this.pos.x, this.pos.y, this.width, 96);
    }

    redirect() {}

    interact() {
        document.addEventListener("mousedown", () => {
            this.isMouseDown = true;
            if (currentMousePos.x > this.pos.x && currentMousePos.x < this.pos.x + this.width && currentMousePos.y < this.pos.y + 96 && currentMousePos.y > this.pos.y) {
                this.sxToDraw = this.animSx;
            } 
        });

        document.addEventListener("mouseup", e => {
            this.sxToDraw = this.imgSx;
            if (currentMousePos.x > this.pos.x && currentMousePos.x < this.pos.x + this.width && currentMousePos.y < this.pos.y + 96 && currentMousePos.y > this.pos.y && this.isMouseDown) {
                this.redirect();
            }
            this.isMouseDown = false;
        });
    }
}

class StartButton extends GuiButton {
    constructor(imgSx, imgSy, animSx, px, py, width) {
        super(imgSx, imgSy, animSx, px, py, width);
    }

    redirect() {
        gui.startMenu.isOnStartScreen = false;
        gui.levelMenu.isOnLevelScreen = false;
        gameIsRunning = true;
        world.getWorld(world.currentWorld); 
    }
}

class LevelButton extends GuiButton {
    constructor(imgSx, imgSy, animSx, px, py, width) {
        super(imgSx, imgSy, animSx, px, py, width);
    }

    redirect() {
        gui.levelMenu.isOnLevelScreen = true;
        gui.startMenu.isOnStartScreen = false
        gameIsRunning = false;
    }
}

class StartMenu {
    constructor() {
        this.isOnStartScreen = false;
        this.startButton = new StartButton(0, 80, 176, 72, 249, 176);
        this.levelButton = new LevelButton(352, 80, 432, 72, 347, 80);
        this.placeHolderButton = new GuiButton(352, 80, 432, 168, 347, 80);
    }

    render() {
        // --------------- Draw BG ---------------
        ctx.fillRect(0, 0, width, height);
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
        this.isOnStartScreen = true;
        gameIsRunning = false;
        this.render();
    }
}

class LevelMenu {
    constructor() {
        this.isOnLevelScreen = false;
    }

    render() {
        // --------------- Draw BG ---------------
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < width / 32; i ++) {
            for (let j = 0; j < height / 32; j ++) {
                var isLightSquare = (i + j) % 2 != 0;
                var v = (isLightSquare) ? 1 : 0;
                ctx.drawImage(tileSheet, v * tileSize, 0, tileSize, tileSize, i * 32, j * 32, 32, 32);
            }
        }

        // --------------- Draw Buttons ---------------
    }

    levelScreen() {
        this.isOnLevelScreen = true;
        gameIsRunning = false;
        this.render();
    }
}

class Gui {
    constructor() {
        this.startMenu = new StartMenu();
        this.levelMenu = new LevelMenu();
    }
}