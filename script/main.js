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
            c: "cyan"
        }
        //ship
        this.ptimer = {
            x: 200  ,
            y: 650,
            w: 50,
            h: 50,
            c:"green"
        }
        //time bar
        this.btimer = {
            x: this.width/2 - (135/2),
            y: 10,
            w: 135,
            h: 10,
            c: "green"
        }

        //player's ship and data
        this.player = {
            x: 0,
            y: 400,
            w: 50,
            h: 50,
            c:"red",
            g: 0,
        }

        this.timeBeforeDrop = 3;
        //this.waveChecked = false;
        this.timerOn = true;
        this.waveAsked = false;
        this.gameOn = true;

        this.loadImages("skulls");

    },

    option: function() {

    },

    keydown: function(e) {
        // if(this.waveAsked && e.key == 'space' && !this.timerOn && this.ptimer.y === 540) {
        //     this.timerOn = true;
        //     this.popupTimer();
        //     //store g
        //     //console.log("yay")
        // } else if(this.timeBeforeDrop <= 0 && e.key == 'a'){
        //     //store g
        // }
        // //console.log(e.key)
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
        }
    },

    mousedown: function(e) {

    },

    mouseup: function(e) {

    },

    step: function(dt) {
        if(this.timeBeforeDrop > 0 && this.timerOn){
            this.timeBeforeDrop -= 1*dt;
            this.btimer.w = this.timeBeforeDrop*135/30;
        }else if(this.timeBeforeDrop <= 0) {
            this.timerOn = false;
            this.timeBeforeDrop = 30;
            this.btimer.w = this.timeBeforeDrop*135/30;
            this.popupTimer();
            //this.askForDrop();
            this.waveAsked = true;
        }
        this.updateHp();
    },

    render: function() {
        this.layer.clear('#333');
        this.layer.fillStyle("red");
        dr(this.captain, this);
        dr(this.player, this);
        dr(this.btimer, this);
        dr(this.ptimer, this);
        this.renderHp();
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
          var t = this.hpTable[i];
          this.layer.drawImage(this.images["skulls"], t.x, 0, 40, 40, 25 + i * 45, 25, 40, 40);
      }
    },

    death: function(){

    }
})
