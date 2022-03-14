class GuiButton {
    constructor(redirectfunc, centerAlligned, sx, sy, px, py) {
        redirectfunc();
        this.ca = centerAlligned;
        this.size = util.Vec2(sx, sy);
        this.pos = util.Vec2(px, py);
    }

    update() {
        this.draw();
    }

    draw() {

    }
}

class StartMenu {
    constructor() {}

    render() {
        for (let i = 0; i < width / 32; i ++) {
            for (let j = 0; j < height / 32; j ++) {
                var isLightSquare = (i + j) % 2 != 0;
                var v = (isLightSquare) ? 1 : 0;                
                ctx.drawImage(tileSheet, v * tileSize, 0, tileSize, tileSize, i * 32, j * 32, 32, 32);
            }
        }
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