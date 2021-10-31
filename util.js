class Util {
    Constructor() {}

    getDist(x, y) {
        var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        return dist;
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
