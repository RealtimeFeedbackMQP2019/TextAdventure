var canvas;
var ctx;

const BAR_MAX_HEIGHT = 100;
const BAR_MAX_WIDTH = 30;

const BAR_DIST = 10;

var VISCOL = new Map();
var INTERPVAL = new Map();

const INTERPSPEED = 0.2;


function visInit(){
    canvas = document.getElementById("visCTX");
    ctx = canvas.getContext("2d");

    //Set colors.
    VISCOL.set("Hunger", "rgba(255,127,0,1.0)");
    VISCOL.set("Food", "rgba(255,64,0,1.0)");
    VISCOL.set("Security", "rgba(0,127,255,1.0)");
    VISCOL.set("Population", "rgba(0,255,64,1.0)");
    VISCOL.set("Military", "rgba(255,0,127,1.0)");
    VISCOL.set("Science", "rgba(127,0,255,1.0)");


    for(var x of GAMEVALS.keys()){
        INTERPVAL.set(x, GAMEVALS.get(x));
    }

    //ctx.fillStyle = "#FF0000";
    //ctx.fillRect(0, 0, 80, 80);
    renderVIS();
}

function renderVIS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    //Let's draw some of the values:
    //Let's start with hunger.
    for(var x of INTERPVAL.keys()){
        INTERPVAL.set(x, INTERPVAL.get(x) - (INTERPVAL.get(x) - GAMEVALS.get(x)) * INTERPSPEED);
    }



    var index = 0;

    for(var x of LIST_OF_VALS){
        var height = BAR_MAX_HEIGHT * (INTERPVAL.get(x) / MAXVALS.get(x));
        ctx.fillStyle = VISCOL.get(x);
        ctx.strokeStyle = "rgba(1,1,1,0)";
        ctx.fillRect(index * BAR_MAX_WIDTH + BAR_DIST * (index + 1), 25 + (BAR_MAX_HEIGHT - height), BAR_MAX_WIDTH, height);
        index += 1;
    }







    window.requestAnimationFrame(renderVIS)
}

