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

}