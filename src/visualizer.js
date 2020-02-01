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

var snapshotIndex = 0;


function visInit(){
    canvas = document.getElementById("previewCTX");
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
    visUpdate();


    //drawFunction(param);
    //render1Vis("Hunger")
}


function visUpdate(){
    interpAllValues();
    renderPreview();
    window.requestAnimationFrame(visUpdate);
}

function drawSnapshot(){
    var snapshotCanvas = document.getElementById("snapshotCTX");
    var snapshotCTX = snapshotCanvas.getContext("2d");

    renderFrame(snapshotCTX, GAMEVALS);
    snapshotCanvas.id = "old-preview" + snapshotIndex;


    snapshotIndex += 1;
}

function interpAllValues(){
    for(var x of INTERPVAL.keys()){
        INTERPVAL.set(x, INTERPVAL.get(x) - (INTERPVAL.get(x) - GAMEVALS.get(x)) * INTERPSPEED);
    }
}




function renderPreview(){
    //This is about the same...
    ctx.lineWidth = 0;
    renderFrame(ctx, INTERPVAL);
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

    //window.requestAnimationFrame(renderPreview);
}

function renderFrame(context, value){
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    var index = 0;

    for(var x of LIST_OF_VALS){

        var height = BAR_MAX_HEIGHT * (value.get(x) / MAXVALS.get(x));


        context.fillStyle = VISCOL.get(x);
        context.strokeStyle = "rgba(1,1,1,0)";
        context.fillRect(index * BAR_MAX_WIDTH + BAR_DIST * (index + 1), 25 + (BAR_MAX_HEIGHT - height), BAR_MAX_WIDTH, height);
        index += 1;
    }
    context.fillStyle = "rgba(255,255,255,0.5)";
    for(var i = 0; i < 5; i++){
        context.fillRect(0, 25 + (i / 5) * (canvas.height - 50), canvas.width, 1);
    }
}
