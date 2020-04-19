
const BAR_MAX_WIDTH = 30;
const BAR_DIST = 10;
var VISCOL = new Map();
var param = null;
var snapshotIndex = 0;

/*
function visInit(){
    let canvas = document.getElementById("previewCTX");


    for(let x of GAMEVALS.keys()){
        INTERPVAL.set(x, GAMEVALS.get(x));
    }

    let visualizer = new BarVisualizer(canvas, BAR_MAX_WIDTH, BAR_DIST, VISCOL);
    visUpdate(visualizer);
}*/


function visUpdate(visualizer){

    //interpAllValues();
    visualizer.drawVisuals();
    window.requestAnimationFrame(function(){visUpdate(visualizer)});
}

function drawSnapshot(height){
    console.log(height);
    let snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.id = "old-preview" + snapshotIndex;
    snapshotCanvas.height = height;
    snapshotCanvas.width = 400;

    let visualizer = new ComboVisualizer(previewCanvas, BAR_MAX_WIDTH, BAR_DIST, true);
    visualizer.drawVisuals();

    snapshotIndex += 1;

    return snapshotCanvas;
}

function createVisualizer(cm, canvas) {
    let lineNumber = cm.lineCount() - 1;
    const lineStr = cm.getLine( lineNumber );
    let charPos = lineStr.length;
    //doc.replaceRange(replacement: string, from: {line, ch}, to: {line, ch},
    cm.replaceRange(
        //lineStr + ' \n\n',
        " \n\n",
        { line:lineNumber, ch:charPos },
        { line:lineNumber, ch: charPos }
    );
    charPos++;

    lineNumber = cm.lineCount() - 1;

    cm.markText(
        { line:lineNumber - 2, ch:charPos - 1},
        { line:lineNumber - 2, ch:charPos },
        { replacedWith: canvas }
    );
    //cm.addWidget( { line:lineNumber, ch:0 }, canvas, true )
}

function updatePreviewVisualizer(cm){
    if(previewCanvas == null){
        //create canvas
        previewCanvas = drawSnapshot(cm.defaultTextHeight());
        //previewCanvas = drawOverview("Population", cm.defaultTextHeight());
        //previewCanvas.stype = "position:fixed";
        previewCanvas.id = "previewCanvas";
        let visualizer = new ComboVisualizer(previewCanvas, BAR_MAX_WIDTH, BAR_DIST, true);
        //let visualizer = new LineGraphVisualizer(previewCanvas, "Population");
        visUpdate(visualizer);
    }
    else{
        //Get current line
         //First remove the widget.
        //First get where to position the widget.
        let lineNumber = cm.lineCount() - 1;
        let charPos = cm.getLine(lineNumber).length;

        let position = cm.charCoords({line:lineNumber, ch:charPos + 2}, "window"); //This gives me the position.
        //offset the position by a small amount.
        //position.top += 50;
        //console.log(position);

        cm.addWidget({line:lineNumber - 1, ch:charPos +  2}, previewCanvas, false);
        document.getElementById("previewCanvas").style.position = "fixed";
        document.getElementById("previewCanvas").style.top = position.top + "px";
        document.getElementById("previewCanvas").style.left = position.left + 30 + "px";
        //Get current line number
        //Remove the element
        //Re insert the element to new position
    }
}

/*
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
}*/


/*
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
}*/