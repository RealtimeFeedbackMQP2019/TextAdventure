var canvas;
var ctx;

const BAR_MAX_HEIGHT = 100;
const BAR_MAX_WIDTH = 30;

const BAR_DIST = 10;

var VISCOL = new Map();
var INTERPVAL = new Map();

const INTERPSPEED = 0.1;

var drawFunction = renderPreview;
var param = null;


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
    drawFunction(param);
    //render1Vis("Hunger")
}

function interpAllValues(){
    for(var x of INTERPVAL.keys()){
        INTERPVAL.set(x, INTERPVAL.get(x) - (INTERPVAL.get(x) - GAMEVALS.get(x)) * INTERPSPEED);
    }
}


function renderPreview(){
    //This is about the same...
    ctx.lineWidth = 0;
    renderVIS();
    //Now draw the change in stats:
    var index = 0;
    for(var x of LIST_OF_VALS){


        if(param != null && param.hasOwnProperty(x)){
            var baseheight = 0;
            baseheight += param[x];
            if(baseheight === 0){
                continue;
            }

            var height = BAR_MAX_HEIGHT * (-baseheight / MAXVALS.get(x));
            //var height = 100;

            //Now find the place to draw...
            var startHeight = BAR_MAX_HEIGHT * (INTERPVAL.get(x) / MAXVALS.get(x));
            startHeight = 25 + (BAR_MAX_HEIGHT - startHeight);

            ctx.strokeStyle = "rgba(1,1,1,1.0)";//Ugly black box
            ctx.lineWidth = 1;
            ctx.strokeRect(index * BAR_MAX_WIDTH + BAR_DIST * (index + 1), startHeight, BAR_MAX_WIDTH, height);
        }

        index += 1;
    }

    window.requestAnimationFrame(renderPreview);
}


// Renders all visualizations
function renderVIS(){
    interpAllValues();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    var index = 0;

    for(var x of LIST_OF_VALS){

        var height = BAR_MAX_HEIGHT * (INTERPVAL.get(x) / MAXVALS.get(x));


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

    //window.requestAnimationFrame(renderVIS);
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