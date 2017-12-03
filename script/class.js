// classes
class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Animation {
    constructor(image, delay, sx, sy, w, h, maxf) {
        this.image = image;
        this.ax = sx;
        this.ay = sy;
        this.sx = sx;
        this.w = w;
        this.h = h;
        this.tw = app.images[this.image].width;
        if(maxf){
            this.tw = this.sx + maxf*this.w;
        }
        this.delay = delay;
    }

    animate(){
        this.loop = setInterval(()=>{
            if(this.ax + this.w < this.tw) {
                this.ax += this.w;
            } else {
                this.ax = this.sx;
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


class Ennemy {
    constructor() {
        this.x = Math.floor((Math.random()*4)) * 100;
        this.y = 100;
        this.cel = Math.floor((Math.random()*10)+10);
        this.anim1 = new Animation("Enemy_1_Flight", 100, 700, 0, 100, 100, 3);
        this.anim2 = new Animation("Enemy_1_Flight", 100, 700, 0, 100, 100, 3);
        this.anim1.animate();
        this.sta = "anim1";
    }

    update(dt) {
        this.y += this.cel*dt;
    }

    draw() {
        this[this.sta].draw(this.x, this.y);
    }

    pop() {

    }

    death() {
        this.anim1.cancel();
        this.anim2.animate();
        setTimeout(()=> {
            this.anim2.cancel();
        }, 1000)
    }
}

class Spawner{
    constructor() {
        this.s = setInterval(()=>{
            app.popEnnemy();
        }, app.goldRatio);
    }

    reset() {
        this.s = setInterval(()=>{
            app.popEnnemy();
        }, app.goldRatio);
    }
}
