
// functions
function dr(obj, app) {
    if(obj.show) {
        app.layer.fillStyle(obj.c);
        app.layer.fillRect(obj.x, obj.y, obj.w, obj.h);
    }
}

function di(img, x, y) {
    var ims = app.images[img];
    app.layer.drawImage(ims, x, y);
}

function collide(box1, box2) {
    if( box1.x > box2.x + box2.w || box1.x + box1.w < box2.x ||
        box1.y + box1.h < box2.y || box1.y > box2.y + box2.h) {
            return false;
    }
    return true;
}
