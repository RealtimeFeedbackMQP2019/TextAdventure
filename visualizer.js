var canvas;
var ctx;

const BAR_MAX_HEIGHT = 100;
const BAR_MAX_WIDTH = 30;

const BAR_DIST = 10;


function visInit(){
    canvas = document.getElementById("visCTX");
    ctx = canvas.getContext("2d");
    //ctx.fillStyle = "#FF0000";
    //ctx.fillRect(0, 0, 80, 80);
    renderVIS();
}

function renderVIS(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    //Let's draw some of the values:
    //Let's start with hunger.

    var index = 0;

    for(var x of LIST_OF_VALS){
        var height = BAR_MAX_HEIGHT * (GAMEVALS.get(x) / MAXVALS.get(x));
        ctx.fillStyle = "rgba(255,127,0,1.0)";
        ctx.strokeStyle = "rgba(1,1,1,0)";
        ctx.fillRect(index * BAR_MAX_WIDTH + BAR_DIST * (index + 1), 25 + (BAR_MAX_HEIGHT - height), BAR_MAX_WIDTH, height);
        index += 1;
    }







    window.requestAnimationFrame(renderVIS)
}

