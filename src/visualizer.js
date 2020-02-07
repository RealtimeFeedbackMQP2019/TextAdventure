

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
    let canvas = document.getElementById("previewCTX");


    for(let x of GAMEVALS.keys()){
        INTERPVAL.set(x, GAMEVALS.get(x));
    }

    let barVisualizer = new BarVisualizer(canvas, BAR_MAX_WIDTH, BAR_DIST, VISCOL);
    visUpdate(barVisualizer);
}


function visUpdate(visualizer){

    interpAllValues();
    visualizer.drawVisuals(INTERPVAL);
    window.requestAnimationFrame(function(){visUpdate(visualizer)});
}

function drawSnapshot(height){
    console.log(height);
    let snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.id = "old-preview" + snapshotIndex;
    snapshotCanvas.height = height;

    let barVisualizer = new BarVisualizer(snapshotCanvas, BAR_MAX_WIDTH, BAR_DIST, VISCOL);
    barVisualizer.drawVisuals(GAMEVALS);

    snapshotIndex += 1;

    return snapshotCanvas;
}

function interpAllValues(){
    for(var x of INTERPVAL.keys()){
        INTERPVAL.set(x, INTERPVAL.get(x) - (INTERPVAL.get(x) - GAMEVALS.get(x)) * INTERPSPEED);
    }
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