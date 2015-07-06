var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 375;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "/images/mariobros.jpg";

var playerReady = false;
var playerIcon = new Image();
playerIcon.onload = function () {
    playerReady = true;
};

playerIcon.src = "/images/supermario.gif";

var enemyReady = false;
var enemyIcon = new Image();
enemyIcon.onload = function () {
    enemyReady = true;
};

enemyIcon.src = "/images/enemy.gif";

var player = {
    speed: 256,
    x: 0,
    y: 0
};

var enemy = {
    x: 0,
    y: 0
};

var monstersCaught = 0;

var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
}, false);

var reset = function () {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    enemy.x = 32 + (Math.random() * (canvas.width - 64));
    enemy.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
    if (38 in keysDown) {
        player.y -= player.speed * modifier;
    }
    if (40 in keysDown) {
        player.y += player.speed * modifier;
    }
    if (37 in keysDown) {
        player.x -= player.speed * modifier;
    }
    if (39 in keysDown) {
        player.x += player.speed * modifier;
    }

    if (
        player.x <= (enemy.x + 32)
        && enemy.x <= (player.x + 32)
        && player.y <= (enemy.y + 32)
        && enemy.y <= (player.y +32)
    ) {
        ++monstersCaught;
        reset();
    }
};

var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0,0);
    }
    if (playerReady) {
        ctx.drawImage(playerIcon, player.x, player.y);
    }
    if (enemyReady) {
        ctx.drawImage(enemyIcon, enemy.x, enemy.y);
    }

    /*score*/
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText ("Enemies captured: " + monstersCaught, 32, 32);
};

/*the actual game loop*/

var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta/1000);
    render();

    then = now;

    /*request to do this again asap*/
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
