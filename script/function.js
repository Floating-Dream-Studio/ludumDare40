// functions
app.popupTimer = function() {
    if(app.ptimer.x > app.width){
        app.tween(app.ptimer)
            .to({x: 500})
    } else {
        app.tween(app.ptimer)
        .to({x: 650})
    }
}
