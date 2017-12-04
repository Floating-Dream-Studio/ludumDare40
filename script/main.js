var app = playground({

    width  : 400,
    height : 600,
    scale  : 1.5,

    create: function() {
        this.mouse.lock();
        this.storage = 0;
        this.hpTable = [
            { v: 2, x: 0},
            { v: 2, x: 0},
            { v: 2, x: 0},
        ];
        this.hp = 6;

        this.dpopup = {
            x: 50,
            y: -300,
            w: 350,
            h: 150
        }
        //platteforme(avatar)
        this.captain = {
            x: 275,
            y: 15,
            w: 50,
            h: 50,
            c: "cyan",
            show: false
        }
        this.captainState = "captainSpawn";
        //ship
        this.ptimer = {
            x: 280,
            y: 650,
            w: 50,
            h: 50,
            c:"green",
            show: true
        }

        //time bar
        this.btimer = {
            x: this.width/2 - (135/2),
            y: 15,
            w: 135,
            h: 10,
            c: "green",
            show: true
        }

        this.galaxy1 = {
            y: 0,
        }
        this.galaxy2 = {
            y: -1200,
        }
        this.star1 = {
            y: 0,
        }
        this.star2 = {
            y: -1200,
        }
        this.play = {
            x : 275,
            y : 325,
            w : 50,
            h : 50,
            show: true,
        }
        //player's ship and data
        this.player = {
            x: 0,
            y: 400,
            w: 100,
            h: 100,
            c:"red",
            g: 0,
            show: true
        }
        this.bullets = [];

        this.ennemies = [];
        this.lvlCel = 30;

        this.maxTime = 15;
        this.timeBeforeDrop = 15;
        this.goldRatio = 5000;
        //this.waveChecked = false;
        this.timerOn = true;
        this.waveAsked = false;
        this.gameOn = true;

        this.hit  = false;
        this.heal = false;

        this.loadImages(
            "skulls",
            "timeBar",
            "timeBarFrame",
            "portal",
            "Ship",
            "Enemy_1_Flight",
            "Enemy_1_Death",
            "Ship_1_Flight",
            "Captain_Display",
            "Captain_1_Friendly",
            "Bullet",
            "PLANETES",
            "2GALAXY",
            "3ETOILES",
            "Frame_GoldBar",
            "DASHBOARD",
            "Icon_Repeat",
            "dpopup",
            "MOTHERSHIP"
        );
        this.loadFont("duck4game");
    },

    ready: function() {
        this.test = new Animation("Ship_1_Flight", 100, 0, 0, 100, 100);
        this.test.animate();
        this.bul = new Animation("Bullet", 100, 0, 0, 10, 10);
        this.bul.animate();
        this.portal = new Animation("portal", 100, 0, 0, 50, 50);
        this.portal.animate();
        this.popEnnemy();
        this.captainDisplay = new Animation("Captain_Display", 100, 0, 0, 100, 100);
        this.captainDisplay.animate();
        this.captainFace = new Animation("Captain_1_Friendly", 200, 600, 0, 100, 100);
        this.captainFace.animate();
        this.captainSpawn = new Animation("Captain_1_Friendly", 200, 0, 0, 100, 100, 6, true);
        //this.captainSpawn.animate();
        this.spawner = setInterval(()=>{
            this.popEnnemy();
        }, 5000);

        this.gun = setInterval(()=>{
            this.shot();
        }, 400);
    },

    option: function() {

    },

    mousemove: function(e) {
        if(e.x > 0 && e.x < this.width) {
            app.player.x = e.x - 50;
            app.player.y = e.y - 50;
        }

        if(this.ptimer.y === 540 && collide(this.player, this.ptimer)) {
            this.timerOn = true;
            this.captain.show = false;
            this.captainState = "captainSpawn";
            this.popupTimer();
            clearTimeout(this.back);
            this.dropGold();
        }
    },

    mousedown: function(e) {

    },

    mouseup: function(e) {
        if(    e.x < this.play.x + this.play.w && e.x > this.play.x
            && e.y < this.play.y + this.play.h && e.y > this.play.y){
                this.resetGame();
                this.gameOn = true;
            }
    },

    step: function(dt) {
        if(this.gameOn) {
            this.galaxy1.y += 50*dt;
            this.galaxy2.y += 50*dt;
            if(this.galaxy1.y > this.height) {
                //console.log(2, this.galaxy2.y)
                this.galaxy1.y = this.galaxy2.y - 1200;
            }
            if(this.galaxy2.y > this.height) {
                //console.log(1, this.galaxy1.y)
                this.galaxy2.y = this.galaxy1.y - 1200;
            }
            this.star1.y += 60*dt;
            this.star2.y += 60*dt;
            if(this.star1.y > this.height) {
                //console.log(2, this.star2.y)
                this.star1.y = this.star2.y - 1200;
            }
            if(this.star2.y > this.height) {
                //console.log(1, this.star1.y)
                this.star2.y = this.star1.y - 1200;
            }
            this.updateEnnemies(dt);
            this.updateBullets(dt);
            if(this.timeBeforeDrop > 0 && this.timerOn){
                this.timeBeforeDrop -= 1*dt;
                this.btimer.w = this.timeBeforeDrop*136/this.maxTime;
            } else if (this.timeBeforeDrop <= 0) {
                this.timerOn = false;
                this.captain.show = true;
                setTimeout(()=>{
                    this.captainState = "captainFace";
                }, 1200)
                this.timeBeforeDrop = this.maxTime;
                this.btimer.w = this.timeBeforeDrop*136/this.maxTime;
                this.popupTimer();
                this.captainSpawn.animate();
                this.back = setTimeout(()=>{
                    this.timerOn = true;
                    this.captain.show = false;
                    this.captainState = "captainSpawn";
                    this.popupTimer();
                }, 5000);
            }
            this.updateHp();
        }
    },

    render: function() {
        this.layer.clear('#333');
        //di("PLANETES", 0, 0);
        di("2GALAXY", 0, this.galaxy1.y);
        di("2GALAXY", 0, this.galaxy2.y);
        di("3ETOILES", 0, this.star1.y);
        di("3ETOILES", 0, this.star2.y);

        this.layer.fillStyle("red");
        //dr(this.player, this);
        di("MOTHERSHIP", 0, 400);
        this.test.draw(this.player.x, this.player.y);
        this.drawBullets();
        //dr(this.captain, this);
        di("DASHBOARD", 0, 0);
        this.renderTimer();
        this.renderBarGold();
        this.renderHp();
        this.captainDisplay.draw(this.captain.x, this.captain.y);
        this.portal.draw(this.ptimer.x, this.ptimer.y);
        this.drawEnnemies();
        if(this.captain.show) {
            this.layer.fillStyle("white");
            this.layer.font("12px duck4game");
            this.layer.fillText("Captain", 290, 140);
            this[this.captainState].draw(this.captain.x, this.captain.y);
        }
        if(!this.gameOn) {
            this.layer.save();
            this.layer.a(0.8);
            this.layer.fillStyle("black")
            this.layer.fillRect(0, 0, this.width, this.height);
            this.layer.restore();
            this.layer.fillStyle("white");
            di("dpopup", this.dpopup.x, this.dpopup.y);
            this.layer.font('24px duck4game');
            this.layer.fillText('SCORE', 60, this.play.y);
            this.layer.fillText('Play again', 60, this.play.y + 35);
            this.layer.fillStyle("yellow");
            this.layer.fillText(this.player.g, 250, this.play.y);
            di("Icon_Repeat", this.play.x, this.play.y);
        }

    },

    //functions
    popupTimer: function() {
        if(app.ptimer.y > app.height){
            app.tween(app.ptimer)
                .to({y: 540}, 0.8)
        } else {
            app.tween(app.ptimer)
                .to({y: 650}, 0.8)
        }
    },

    dropGold: function(){
        this.timerOn = true;
        if(this.player.g >= 50){
            this.storage += this.player.g;
            this.player.g = 0;
        }
        this.slowDown();
        this.popupTimer();
        this.goldRatio = 5000;
        this.resetSpanwer();
    },

    updateHp: function(){
        for(var i = 0; i < this.hpTable.length; i++) {
            var t = this.hpTable[i];
            t.x = t.v * 40;
        }
    },

    renderHp: function(){
        for(var i = 0; i < this.hpTable.length; i++) {
            if(this.hit) {
                this.layer.drawImage(this.images["skulls"], 120, 0, 40, 40, 20 + i * 45, 50, 40, 40);
            } else if (this.heal) {
                this.layer.drawImage(this.images["skulls"], 160, 0, 40, 40, 20 + i * 45, 50, 40, 40);
            }
            var t = this.hpTable[i];
            this.layer.drawImage(this.images["skulls"], t.x, 0, 40, 40, 20 + i * 45, 50, 40, 40);
        }
    },

    renderBarGold: function() {
        var w = this.player.g * 50 / 300;
        if(this.player.g >= 300) {
            w = 50;
        }
        this.layer.fillStyle("yellow");
        this.layer.fillRect(this.player.x + 25, this.player.y + 110, w, 10);
        di("Frame_GoldBar", this.player.x + 21, this.player.y + 110);
    },

    renderTimer: function() {
        this.layer.drawImage(this.images["timeBarFrame"], this.width/2-75, 10);
        this.layer.drawImage(this.images["timeBar"], 125, 10);
        this.layer.fillStyle('#333');
        this.layer.fillRect(265 - (136-this.btimer.w), 15, 136-this.btimer.w, 20);
    },

    hpp: function() {
        var i = 0;
        while( i < this.hpTable.length) {
            if(this.hpTable[i].v < 2){
                this.hpTable[i].v += 1;
                this.updateHp();
                this.heal = true;
                setTimeout(()=>{
                    this.heal = false;
                }, 100);
                return;
            }
            i++;
        }
        return 'full';
    },

    hpm: function() {
        var i = this.hpTable.length;
        while( i > 0) {
            i--;
            if(this.hpTable[i].v >= 1) {
                this.hpTable[i].v -= 1;
                this.updateHp();
                this.hit = true;
                setTimeout(() => {
                    this.hit = false;
                }, 100);
                return;
            }
        }
        this.death();
        return 'dead';
    },

    popEnnemy: function() {
        // var r = Math.floor((Math.random() * 1000) + 1 );
        this.ennemies.push(new Ennemy());

    },

    updateEnnemies: function(dt) {
        for(var i = this.ennemies.length-1; i >= 0; i--) {
            this.ennemies[i].update(dt);
            if(this.ennemies[i].y > this.height - 100 /*- 250*/ && this.ennemies[i].sta === "anim1") {
                this.ennemies[i].death();
                this.ennemies[i].cel = 0;
                this.hpm();
            }
            if(this.ennemies[i].dead) {
                this.ennemies.splice(i, 1);
            }
        }
    },

    drawEnnemies: function() {
        for(var i = this.ennemies.length-1; i >= 0; i--) {
            this.ennemies[i].draw();
        }
    },

    shot() {
        var x = this.player.x + 45;
        var y = this.player.y;
        this.bullets.push(new Bullet(x, y));
    },

    updateBullets: function(dt) {
        for(var i = this.bullets.length-1; i >= 0; i--) {
            this.bullets[i].update(dt);
            if(this.bullets[i].y < 0) {
                this.bullets.splice(i, 1);
            } else {
                for(var a = 0; a < this.ennemies.length; a++) {
                    var x1 = this.ennemies[a].x + 50;
                    var y1 = this.ennemies[a].y + 50;
                    var x2 = this.bullets[i].x + 5;
                    var y2 = this.bullets[i].y + 5;
                    if(dist(x1, y1, x2, y2) <= 20 && this.bullets[i].show && this.ennemies[a].sta === "anim1") {
                        this.bullets[i].show = false;
                        this.player.g += 10;
                        //console.log("g")
                        this.ennemies[a].cel = 0;
                        this.ennemies[a].death();
                        this.goldRatio -= this.player.g;
                        this.resetSpanwer();
                    }
                }
            }
        }
    },

    drawBullets: function() {
        for (var i = 0; i < this.bullets.length; i++) {
            //this.bullets[i].draw();
            this.bul.draw(this.bullets[i].x, this.bullets[i].y)
        }
    },

    increaseSpeed: function() {
        for(var i = 0; i < this.ennemies.length; i++) {
            this.ennemies[i].cel += 1;
        }
        this.lvlCel += 1;
    },

    slowDown: function() {
        for(var i = 0; i < this.ennemies.length; i++) {
            this.ennemies[i].cel = 20;
        }
    },

    resetSpanwer: function() {
        this.spawner = setTimeout(()=>{
            this.popEnnemy();
        }, this.goldRatio)
    },

    death: function() {
        this.tween(this.dpopup)
            .to({y: 100}, 0.3);
        clearInterval(this.spawner);
        clearInterval(this.gun);
        this.gameOn = false;
    },

    resetGame: function() {
        this.player.g = 0;
        this.goldRatio = 5000;
        this.timerOn = true;
        this.hpTable[0].v = 2;
        this.hpTable[1].v = 2;
        this.hpTable[2].v = 2;
        this.timeBeforeDrop = 15;
        this.ennemies = [];
        this.spawner = setInterval(()=>{
            this.popEnnemy();
        }, 5000);
    }


})
