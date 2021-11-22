const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

dangerdistance = 2
player = {
    x: 30,
    y: 250,
    r: 0,
    rspeed: 2,
    tv: 1, //total velocity
    maxvelocity: 2.5,
    vx: 0,
    vy: 0,
    accelerationspeed: .2,
    sight: .1,
};

exit1 = {
    x: 950,
    y: 100
}
exit2 = {
    x: 950,
    y: 450
}
exit3 = {
    x: 246,
    y: 100
}
exit4 = {
    x: 500,
    y: 300
}



var keyState = {};
window.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
}, true);


function gameLoop() {
    if (keyState[37] || keyState[65]) {
        if (player.vx > -1) {
            player.vx += -1
        }
    }
    if (keyState[39] || keyState[68]) {
        if (player.vx < 1) {
            player.vx += 1
        }
    }
    if (keyState[38] || keyState[87]) {
        if (player.vy > -1)
            player.vy += -1
    }
    if (keyState[40] || keyState[83]) {
        if (player.vy < 1) {
            player.vy += 1
        }
    }
    if (!keyState[40] && !keyState[83] && !keyState[38] && !keyState[87]) {
        player.vy = 0
    }
    if (!keyState[37] && !keyState[65] && !keyState[39] && !keyState[68]) {
        player.vx = 0
    }
    if (((keyState[38] || keyState[87]) && (keyState[39] || keyState[68])) || ((keyState[38] || keyState[87]) && (keyState[37] || keyState[65])) || ((keyState[40] || keyState[83]) && (keyState[37] || keyState[65])) || ((keyState[40] || keyState[83]) && (keyState[39] || keyState[68]))) {
        player.tv = .707
    } else {
        player.tv = 1
    }
}


function wallcheck() {
    for (var i = 0; i < walls.length; i++) {
        if (walls[i]["type"] == 1) {
            if ((player.x - 10 <= walls[i]["x1"]) && (walls[i]["x1"] <= player.x + 10)) {
                if ((walls[i]["y1"] < player.y) && (player.y < walls[i]["y2"])) {
                    if ((player.x < walls[i]["x1"]) && (player.vx > 0)) {
                        player.vx = 0
                    }
                    if ((player.x > walls[i]["x1"]) && (player.vx < 0)) {
                        player.vx = 0
                    }
                }
                if ((player.x - 5 <= walls[i]["x1"]) && (walls[i]["x1"] <= player.x + 5)) {
                    if (((player.y - 10 <= walls[i]["y2"]) && (player.y + 10 >= walls[i]["y2"])) && (player.vy < 1)) {
                        player.vy = 0
                    }
                    if (((player.y - 10 <= walls[i]["y1"]) && (player.y + 10 >= walls[i]["y1"])) && (player.vy > 0)) {
                        player.vy = 0
                    }
                }
            }

        } else {
            if ((player.y - 10 <= walls[i]["y1"]) && (walls[i]["y1"] <= player.y + 10)) {
                if ((walls[i]["x1"] < player.x) && (player.x < walls[i]["x2"])) {
                    if ((player.y < walls[i]["y1"]) && (player.vy > 0)) {
                        player.vy = 0
                    }
                    if ((player.y > walls[i]["y1"]) && (player.vy < 0)) {
                        player.vy = 0
                    }
                }
                if ((player.y - 10 <= walls[i]["y1"]) && (walls[i]["y1"] <= player.y + 10)) {
                    if (((player.x - 10 <= walls[i]["x2"]) && (player.x + 10 >= walls[i]["x2"])) && (player.vx < 1)) {
                        player.vx = 0
                    }
                    if (((player.x - 10 <= walls[i]["x1"]) && (player.x + 10 >= walls[i]["x1"])) && (player.vx > 0)) {
                        player.vx = 0
                    }
                }
            }
        }
    };
}


var maininterval = setInterval(function () {

    if (player.x > canvas.width - 10) {
        player.x = canvas.width - 10
    }
    if (player.x < 10) {
        player.x = 10
    }
    if (player.y < 10) {
        player.y = 10;
    }
    if (player.y > canvas.height - 10) {
        player.y = canvas.height - 10
    }
    testExitTouched();
    gameLoop();
    wallcheck();
    newframe();
    move();
}, 5)

function testExitTouched() {
    var distancetoExit1 = Math.sqrt(Math.pow((exit1.x - player.x), 2) + Math.pow((exit1.y - player.y), 2))
    if (distancetoExit1 <= 20) {
        window.location.href = "https://replit.com/@PANKHURIGOYAL1/Escape-Room-JAVA#Main.java";
    }
    var distancetoExit2 = Math.sqrt(Math.pow((exit2.x - player.x), 2) + Math.pow((exit2.y - player.y), 2))
    if (distancetoExit2 <= 20) {
        window.location.href = "URL OF MINIGAME2";
    }
    var distancetoExit3 = Math.sqrt(Math.pow((exit3.x - player.x), 2) + Math.pow((exit3.y - player.y), 2))
    if (distancetoExit3 <= 20) {
        window.location.href = "URL OF MINIGAME3";
    }
    var distancetoExit4 = Math.sqrt(Math.pow((exit4.x - player.x), 2) + Math.pow((exit4.y - player.y), 2))
    if (distancetoExit4 <= 20) {
        window.location.href = "URL OF MINIGAME4";
    }
}



function move() {
    player.x = player.x + (player.vx * (player.tv))
    if ((player.x + 40) > canvas.width || (player.x - 40) < 0) {
        player.vx = 0
    }
    player.y = player.y + (player.vy * (player.tv))
    if ((player.y + 40) > canvas.height || (player.y - 40) < 0) {
        player.vy = 0
    }
};

function newframe() {

    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    //player shape
    ctx.arc(player.x, player.y, 10, 0, 2 * Math.PI);

    ctx.closePath();



    // the fill color
    ctx.fillStyle = "#FF0000"
    ctx.fill();



    //renderwalls
    for (var b = 0; b < walls.length; b++) {
        ctx.beginPath();
        ctx.moveTo(walls[b]["x1"], walls[b]["y1"])
        ctx.lineTo(walls[b]["x2"], walls[b]["y2"])
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000"
        ctx.stroke();
    }
    //end render walls


    ctx.beginPath();
    ctx.arc(exit1.x, exit1.y, 10, 0, 360)
    ctx.fillStyle = "#00FF00"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(exit2.x, exit2.y, 10, 0, 360)
    ctx.fillStyle = "#00FF00"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(exit3.x, exit3.y, 10, 0, 360)
    ctx.fillStyle = "#00FF00"
    ctx.fill();
    ctx.beginPath();
    ctx.arc(exit4.x, exit4.y, 10, 0, 360)
    ctx.fillStyle = "#00FF00"
    ctx.fill();

    //fog
    var grd = ctx.createRadialGradient(player.x, player.y, player.sight, player.x, player.y, 625);
    grd.addColorStop(0, "transparent");
    grd.addColorStop(.1, "black");


    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.rect(1000, 0, -1000, 500);
    ctx.fillStyle = grd;
    ctx.fill();
    //end fog


};
newframe();
