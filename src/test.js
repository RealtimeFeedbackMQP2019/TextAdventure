// test.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
var commandPrompt;







// Timer to update game - called with eack tick
var gameTickUpdate;

// Initialize commandPrompt and game ticks
function init(){

    initVariables();
    visInit();

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : false
    });
    commandPrompt.setOption("extraKeys",{
       Enter: function(cm){
           var line = commandPrompt.getLine(0);
           matchCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });

    gameTickUpdate = setInterval('update()', 1000);
}

// Update the game state - called at each game tick
function update(){
    if(GAMEVALS.get("Population") <= 0) subtractFromValue("Hunger", 2);
    else if (GAMEVALS.get("Science") <= 0 && GAMEVALS.get("Military") > 0) {
        subtractFromValue("Military", 10);
        subtractFromValue("Population", 3);
        subtractFromValue("Hunger", 1);
    }
    else if (GAMEVALS.get("Military") <= 0 && GAMEVALS.get("Science") > 0) {
        subtractFromValue("Population", 3);
        subtractFromValue("Hunger", 1);
    }
    else if (GAMEVALS.get("Military") <= 0 && GAMEVALS.get("Science") <= 0) {
        subtractFromValue("Population", 4);
        subtractFromValue("Hunger", 1);
    }
    else {
        subtractFromValue("Hunger", 1);
        subtractFromValue("Population", 2);
        subtractFromValue("Military", 5);
        subtractFromValue("Science", 5);
    }
}

function checkGameStatus(){
    if(GAMEVALS.get("Hunger") <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").style.display = "inline";
        // Somehow disable commands from being entered
    }
}

function updateDisplayVariables(){
    for(var x of LIST_OF_VALS){
        document.getElementById(x).innerHTML = GAMEVALS.get(x);
    }
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


var responded = false;

// Function for executing command
function matchCommand(){

    var command = commandPrompt.getValue();
    var actual = command.toLowerCase();
    var lbpos = command.indexOf("(");
    var argString = actual.substr(lbpos + 1, actual.length - lbpos - 2);

    // Actual command name
    actual = actual.substr(0, lbpos);

    // Arguments of choose() command
    var arguments = argString.split(/\s*,{1}\s*/);

    // Break the command into the command body and argument.
    switch(actual){

        // Eat() command
        case "eat":
            subtractFromValue("Food", 1);
            addToValue("Hunger", 5);
            break;

        // RaiseSecurity() command
        case "raisesecurity":
            if(GAMEVALS.get("Security") < 5){
                addToValue("Security", 1);
            }
            break;

        // Choose() command with parameters
        case "choose":
            console.log(arguments);
            console.log(typeof arguments);
            if(!responded) {
                switch (arguments.shift()) {
                    case "1":
                        responded = true;
                        subtractFromValue("Military", 5);
                        break;
                    case "2":
                        responded = true;
                        subtractFromValue("Population", 30);
                        addToValue("Science", 10);
                        break;
                }
            }
    }
}