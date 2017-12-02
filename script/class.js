// classes
class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Animation {
    constructor(image, delay, sx, sy, w, h) {
        this.image = image;
        this.ax = sx;
        this.ay = sy;
        this.w = w;
        this.h = h;
        this.tw = app.images[this.image].width;
        this.delay = delay;
    }

    animate(){
        this.loop = setInterval(()=>{
            if(this.ax + this.w < this.tw) {
                this.ax += this.w;
            } else {
                this.ax = 0;
            }
        }, this.delay);
    }

    cancel() {
        clearInterval(this.loop);
    }

    draw(x, y) {
        app.layer.drawImage(app.images[this.image], this.ax, this.ay, this.w, this.h, x, y, this.w, this.h);
    }
}
