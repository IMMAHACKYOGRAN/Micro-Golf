class Util {
    Constructor() {}

    getDist(x1, y1, x2, y2) {
        let xDist = x2 - x1;
        let yDist = y2 - y1;
    
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
    }

    loadImage (url) {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener('load', () => {
                resolve(img);
            });
            img.src = url;
        });
    }

    draw (url, x, y) {
        this.loadImage(url)
        .then(img => {
            ctx.drawImage(img, x, y);
        });
    }

    buidGrid (columns, rows) {
        return new Array(columns).fill(null)
          .map(() => new Array(rows).fill(0));
    }
    
    Vec2 (x, y) {
        let vec = {x: x, y: y}
        return vec;
    }
}
