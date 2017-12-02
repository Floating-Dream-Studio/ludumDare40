var app = playground({

    width  : 400,
    height : 600,
    scale  : 1.5,

    create: function() {
        this.mouse.lock();
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
        this.player = {
            x: 0,
            y: 350,
            w: 50,
            h: 50,
            c:"red",
            g: 0,
        }

    },

    keydown: function(e) {

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

    step: function() {
    },

    render: function() {
        this.layer.clear('#333');
        this.layer.fillStyle("red");
        dr(this.pnjTimer, this);
        dr(this.player, this);
    },

    //functions
    popupTimer: function() {
        if(app.ptimer.x > app.width){
            app.tween(app.ptimer)
                .to({x: 500})
        } else {
            app.tween(app.ptimer)
                .to({x: 650})
        }
    }
})
