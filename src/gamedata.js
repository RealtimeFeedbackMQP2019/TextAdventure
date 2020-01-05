var GAMEVALS = new Map();
var MAXVALS = new Map(); //Used for visualizing things.

var LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

function initVariables(){
    GAMEVALS.set("Hunger", 20);
    GAMEVALS.set("Food", 5);
    GAMEVALS.set("Security", 3);
    GAMEVALS.set("Population", 1000);
    GAMEVALS.set("Military", 100);
    GAMEVALS.set("Science", 50);

    MAXVALS.set("Hunger", 40);
    MAXVALS.set("Food", 20);
    MAXVALS.set("Security", 5);
    MAXVALS.set("Population", 1000);
    MAXVALS.set("Military", 100);
    MAXVALS.set("Science", 50);
}

function addToValue(key, value){
    if(GAMEVALS.get(key) + value < 0){
        GAMEVALS.set(key, 0);
    }
    else{
        GAMEVALS.set(key, GAMEVALS.get(key) + value);
    }
    updateDisplayVariables();
    checkGameStatus();
}

function subtractFromValue(key, value){
    addToValue(key, -value);
}

function checkGameStatus(){

    // Check for game loss condition
    if(GAMEVALS.get("Hunger") <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").innerHTML = "GAME OVER";
        document.getElementById("gameOver").style.display = "inline";
        // Somehow disable commands from being entered
        document.getElementById("textEditorBox").disabled = true;
    }

    // Check for game win condition
    if(currPrompt === "CONGRATS, YOU WON!") {
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").innerHTML = "YOU'RE WINNER";
        document.getElementById("gameOver").style.display = "inline";
    }
}

function updateDisplayVariables(){
    for(var x of LIST_OF_VALS){
        document.getElementById(x).innerHTML = GAMEVALS.get(x);
    }
}