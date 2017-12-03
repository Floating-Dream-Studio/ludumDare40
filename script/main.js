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

        //platteforme(avatar)
        this.captain = {
            x: 300,
            y: 50,
            w: 50,
            h: 50,
            c: "cyan",
            show: false
        }

        //ship
        this.ptimer = {
            x: 200,
            y: 650,
            w: 50,
            h: 50,
            c:"green",
            show: true
        }

        //time bar
        this.btimer = {
            x: this.width/2 - (135/2),
            y: 10,
            w: 135,
            h: 10,
            c: "green",
            show: true
        }

        //player's ship and data
        this.player = {
            x: 0,
            y: 400,
            w: 50,
            h: 50,
            c:"red",
            g: 300,
            show: true
        }

        this.ennemies = [];
        this.goldRatio = 5000;

        this.timeBeforeDrop = 3;
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
            "Enemy_1_Flight"
        );

        this.loadFont("duck4game");
    },

    ready: function() {
        this.test = new Animation("Ship", 100, 0, 0, 50, 50);
        this.test.animate();
        this.portal = new Animation("portal", 100, 0, 0, 50, 50);
        this.portal.animate();
        this.spawner = setInterval(()=>{
            this.popEnnemy();
        }, 5000)
    },

    option: function() {

    },

    keydown: function(e) {

    },

    keyup: function(e) {

    },

    mousemove: function(e) {
        if(e.x > 0 && e.x < this.width) {
            app.player.x = e.x - 25;
            app.player.y = e.y - 25;
        }

        if(this.ptimer.y === 540 && collide(this.player, this.ptimer)) {
            this.timerOn = true;
            this.popupTimer();
            clearTimeout(this.back);
            this.dropGold();
        }
    },

    mousedown: function(e) {

    },

    mouseup: function(e) {

    },

    step: function(dt) {
        if(this.gameOn) {
            this.updateEnnemies(dt);
            if(this.timeBeforeDrop > 0 && this.timerOn){
                this.timeBeforeDrop -= 1*dt;
                this.btimer.w = this.timeBeforeDrop*136/30;
            } else if (this.timeBeforeDrop <= 0) {
                this.timerOn = false;
                this.timeBeforeDrop = 30;
                this.btimer.w = this.timeBeforeDrop*136/30;
                this.popupTimer();
                this.back = setTimeout(()=>{
                    this.timerOn = true;
                    this.popupTimer();
                }, 5000);
            }
            this.updateHp();
        }
    },

    render: function() {
        this.layer.clear('#333');
        this.layer.fillStyle("red");
        dr(this.player, this);
        this.test.draw(this.player.x, this.player.y);
        dr(this.captain, this);
        this.renderTimer();
        this.renderBarGold();
        this.renderHp();
        this.portal.draw(this.ptimer.x, this.ptimer.y);
        if(!this.captain.show) {
            this.layer.fillStyle("white");
            this.layer.font("12px duck4game");
            this.layer.fillText("Captain", 290, 120);
        }
        this.drawEnnemies();
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
            this.player.g -= 50;
            this.storage += 50;
        }
        this.popupTimer();
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
                this.layer.drawImage(this.images["skulls"], 120, 0, 40, 40, 25 + i * 45, 50, 40, 40);
            } else if (this.heal) {
                this.layer.drawImage(this.images["skulls"], 160, 0, 40, 40, 25 + i * 45, 50, 40, 40);
            }
            var t = this.hpTable[i];
            this.layer.drawImage(this.images["skulls"], t.x, 0, 40, 40, 25 + i * 45, 50, 40, 40);
        }
    },

    renderBarGold: function() {
        var w = this.player.g * 50 / 300;
        this.layer.fillStyle("yellow");
        this.layer.fillRect(this.player.x, this.player.y + 60, w, 10);
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
        return 'dead';
    },

    popEnnemy: function() {
        var r = Math.floor((Math.random() * 1000) + 1 );
        //if( r <= 10 ) {
            this.ennemies.push(new Ennemy());
        //}
    },

    updateEnnemies: function(dt) {
        for(var i = 0; i < this.ennemies.length; i++) {
            this.ennemies[i].update(dt);
            if(this.ennemies[i].y > this.height){
                this.ennemies.splice(i, 1);
            }
        }
    },

    drawEnnemies: function() {
        for(var i = this.ennemies.length-1; i >= 0; i--) {
            this.ennemies[i].draw();
        }
    },

    death: function(){

    }
})
