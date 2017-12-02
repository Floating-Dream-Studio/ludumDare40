var app = playground({

    width  : 400,
    height : 600,
    scale  : 1.5,

    create: function() {
        this.mouse.lock();
        this.hpTable = [0, 0, 0];
        this.pnjTimer = {
            x: 300,
            y: 50,
            w: 50,
            h: 50,
            c: "cyan"
        }
        this.ptimer = {
            x: 500,
            y: 50,
            w: 50,
            h: 50,
            c:"green"
        }
        this.btimer = {
            x: 300,
            y: 30,
            w: 50,
            h: 10,
            c: "green"
        }
        this.player = {
            x: 0,
            y: 400,
            w: 50,
            h: 50,
            c:"red",
            g: 0,
        }
        this.timeBeforeDrop = 3;
        this.waveChecked = false;
        this.timerOn = true;
        this.waveAsked = false;

        this.loadImages();

    },

    option: function() {

    },

    keydown: function(e) {
        if(this.waveAsked && e.key == 'space') {
            this.timerOn = true;
            //store g
            console.log("yay")
        } else if(this.timeBeforeDrop <= 0 && e.key == 'a'){
            //store g
        }
        console.log(e.key)
    },

    keyup: function(e) {

    },

    mousemove: function(e) {
        if(e.x > 0 && e.x < this.width) {
            app.player.x = e.x;
        }
    },

    mousedown: function(e) {

    },

    mouseup: function(e) {

    },

    step: function(dt) {
        if(this.timeBeforeDrop > 0 && this.timerOn){
            this.timeBeforeDrop -= 1*dt;
            this.btimer.w = this.timeBeforeDrop*50/30;
        }else if(this.timeBeforeDrop <= 0){
            this.timerOn = false;
            this.timeBeforeDrop = 30;
            this.btimer.w = this.timeBeforeDrop*50/30;
            this.popupTimer();
            this.askForDrop();
            this.waveAsked = true;
        }
    },

    render: function() {
        this.layer.clear('#333');
        this.layer.fillStyle("red");
        dr(this.pnjTimer, this);
        dr(this.player, this);
        dr(this.btimer, this);
        dr(this.ptimer, this);
    },

    //functions
    popupTimer: function() {
        if(app.ptimer.x > app.width){
            app.tween(app.ptimer)
                .to({x: 300})
        } else {
            app.tween(app.ptimer)
                .to({x: 650})
        }
    },
    askForDrop: function(){

    },
    mapTimer: function(){

    },
    renderHp: function(){

    }
})
