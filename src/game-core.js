// game-core.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
let commandPrompt;

// Timer to update game - called with eack tick
let gameTickUpdate;

// Keep track of current age and prompt
let currAge;
let currPrompt;

// Initialize commandPrompt and game ticks
function init(){

    initVariables();
    visInit();

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : false
    });
    commandPrompt.setOption("extraKeys",{
       Enter: function(cm){
           let line = commandPrompt.getLine(0);
           matchCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });

    gameTickUpdate = setInterval('update()', 1000);

    // Set current age to Stone Age and prompt to Stone Age 1
    currAge = prompts.StoneAge;
    currPrompt = prompts.StoneAge.StoneAge1;

    // Display first prompt
    document.getElementById("prompt").innerHTML = prompts.StoneAge.StoneAge1.Prompt;
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


//var responded = false;

// Function for executing command
function matchCommand(){

    let command = commandPrompt.getValue();
    let actual = command.toLowerCase();
    let lbpos = command.indexOf("(");
    let argString = actual.substr(lbpos + 1, actual.length - lbpos - 2);

    // Actual command name
    actual = actual.substr(0, lbpos);

    // Arguments of choose() command
    let arguments = argString.split(/\s*,{1}\s*/);

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
            //if(!responded) {
                switch (arguments.shift()) {
                    case "1":
                        //responded = true;
                        changeStats(currPrompt.Choice1);
                        currPrompt = getNextPrompt();
                        document.getElementById("prompt").innerHTML = currPrompt.Prompt;
                        break;
                    case "2":
                        //responded = true;
                        changeStats(currPrompt.Choice2);
                        currPrompt = getNextPrompt();
                        document.getElementById("prompt").innerHTML = currPrompt.Prompt;
                        break;
                }
            //}
    }
}

// Function for switching to next prompt
function getNextPrompt() {
    let nextPrompt = {};
    let found = false;
    let prompts = Object.keys(currAge);
    for(let i = 0; i < prompts.length; i++) {
        if(found) {
            nextPrompt = currAge[prompts[i]];
            found = false;
            break;

        }
        if(currAge[prompts[i]] === currPrompt) {
            found = true;
        }

    }

    return nextPrompt;

}

// Function for changing values base on choice
function changeStats(choice) {
    addToValue("Food", choice.Food);
    addToValue("Security", choice.Security);
    addToValue("Population", choice.Population);
    addToValue("Military", choice.Military);
    addToValue("Science", choice.Science);
}