// classes
class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Animation {
    constructor(image, delay, sx, sy, w, h, maxf, stop) {
        this.image = image;
        this.ax = sx;
        this.ay = sy;
        this.sx = sx;
        this.w = w;
        this.h = h;
        this.stop = stop;
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
                if(this.stop){
                    console.log("stop")
                    this.cancel();
                } else {
                    this.ax = this.sx;
                }
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
        this.cel = Math.floor((Math.random()*10))+30;
        this.anim1 = new Animation("Enemy_1_Flight", 100, 0, 0, 100, 100);
        this.anim2 = new Animation("Enemy_1_Death", 100, 0, 0, 100, 100);
        this.anim1.animate();
        this.sta = "anim1";
        this.dead = false;
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
        this.sta = "anim2";
        this.anim2.animate();
        setTimeout(()=> {
            this.anim2.cancel();
            this.dead = true;
        }, 500)
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

class Bullet{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
        this.show = true;
    }

    update(dt) {
        this.y -=  250*dt;
    }

    draw() {
        if(this.show) {
            app.layer.fillStyle("red");
            app.layer.fillRect(this.x, this.y, 10, 10);
        }
    }
}
