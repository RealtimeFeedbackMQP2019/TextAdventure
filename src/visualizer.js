var canvas;
var ctx;

const BAR_MAX_HEIGHT = 100;
const BAR_MAX_WIDTH = 30;

const BAR_DIST = 10;

var VISCOL = new Map();
var INTERPVAL = new Map();

const INTERPSPEED = 0.1;


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
    //render1Vis("Hunger")
}

function interpAllValues(){
    for(var x of INTERPVAL.keys()){
        INTERPVAL.set(x, INTERPVAL.get(x) - (INTERPVAL.get(x) - GAMEVALS.get(x)) * INTERPSPEED);
    }
}

// Renders all visualizations
function renderVIS(dataPreview={}){
    interpAllValues();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    var index = 0;

    for(var x of LIST_OF_VALS){

        var baseheight = INTERPVAL.get(x);

        if(dataPreview.hasOwnProperty(x)){
            //Set the value accordingly....
            baseheight += dataPreview[x];
        }
        var height = BAR_MAX_HEIGHT * (baseheight / MAXVALS.get(x));


        ctx.fillStyle = VISCOL.get(x);
        ctx.strokeStyle = "rgba(1,1,1,0)";
        ctx.fillRect(index * BAR_MAX_WIDTH + BAR_DIST * (index + 1), 25 + (BAR_MAX_HEIGHT - height), BAR_MAX_WIDTH, height);
        index += 1;
    }

    //Draw the tick lines

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    for(var i = 0; i < 5; i++){
        ctx.fillRect(0, 25 + (i / 5) * (canvas.height - 50), canvas.width, 1);
    }

    window.requestAnimationFrame(renderVIS);
}

//Render only 1 bar
function render1Vis(visname){

    interpAllValues();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    var anchorU = (canvas.height - BAR_MAX_HEIGHT/2) / 2;
    var anchorL = BAR_DIST;

    var MW = canvas.width - BAR_DIST * 2;

    var width = MW * (INTERPVAL.get(visname) / MAXVALS.get(visname));
    ctx.fillStyle = VISCOL.get(visname);
    ctx.strokeStyle = "rgba(1,1,1,0)";
    ctx.fillRect(anchorL, anchorU, width, BAR_MAX_HEIGHT/2);


    window.requestAnimationFrame(function(){
        render1Vis(visname);
    });
}