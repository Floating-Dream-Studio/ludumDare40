var app = playground({

    width  : 400,
    height : 600,
    scale  : 1.5,

    create: function() {
        this.pnjTimer = {
            x: 300,
            y: 50,
            w: 50,
            h: 50,
            g: 0
        }
        this.ptimer = {
            x: 500,
            y: 50,
            w: 50,
            h: 50
        }

    },

    keydown: function(e) {

    },

    keyup: function(e) {

    },

    mousemove: function(e) {

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
        this.layer.fillRect(this.pnjTimer.x, this.pnjTimer.y, this.pnjTimer.w, this.pnjTimer.h);
        this.layer.fillRect(this.ptimer.x, this.ptimer.y, this.ptimer.w, this.ptimer.h);
    }
})
