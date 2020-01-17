// game-core.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
//let commandPrompt;

// Timer to update game - called with each tick
let gameTickUpdate;

// Keep track of current prompt
let currPrompt;

// Initialize commandPrompt and game ticks
function init(){

    initVariables();
    visInit();

    /*commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : false
    });
    commandPrompt.setOption("extraKeys",{
       Enter: function(cm){
           let line = commandPrompt.getLine(0);
           matchCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });*/

    gameTickUpdate = setInterval('update()', 1000);

    // Set current prompt to Stone Age 1
    currPrompt = prompts.StoneAge1;

    // Display first prompt
    //document.getElementById("prompt").innerHTML = prompts.StoneAge1.Prompt;
    addPrompt(prompts.StoneAge1.Prompt);
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

const keywords = ["eat", "raiseSecurity", "choose"];
const functions = {
    "":function(){
        drawFunction = renderPreview;
        param = {};
    },
    "eat": function(){
        drawFunction = renderPreview;
        param = {"Hunger":5};
    },
    "raiseSecurity": function () {
        drawFunction = renderPreview;
        param = {"Security":1};
    },
    "choose": function () {
        //don't do anything yet..
    }
};

function prematchCommand(inputString){
    console.log(inputString);
    if(inputString === ""){
        functions[""]();
        return;
    }

    let lbpos = inputString.indexOf("(");
    if(lbpos !== -1){
        //We have found less information than given
        let command = inputString.substring(0, lbpos);
        for(var keyword of keywords){
            if(keyword === command){
                //Found a match for the command, call function..
                functions[keyword]();
            }

        }
    }
    else{

        for(var keyword of keywords){
            //Matches the parameters. also gives the index of where it is.
            if(keyword.startsWith(inputString)){
                //Found a partial match...
                //call function...
                functions[keyword]();
            }
        }
    }
}

function matchKeyPress(event){

    if(event.keyCode === 13) {
        //Fire this event to match command
        matchCommand();
    }
    else{
        //Fire this event to prematch
        let text = document.getElementById("textEditorBox").textContent;
        let line = text.substr(text.lastIndexOf(">"));
        let command = line.substr(1);
        prematchCommand(command);
    }
}

// Function for executing command
function matchCommand(inputString){

    // For now, only when enter is pressed
    if(event.keyCode === 13) {
        //let promptAndHistory = document.getElementById("promptBox").textContent;
        let text = document.getElementById("textEditorBox").textContent;
        let line = text.substr(text.lastIndexOf(">"));
        let command = line.substr(1);
        // Get last line of text area

        console.log(command);
        //let command = commandPrompt.getValue();
        let actual = command.toLowerCase();
        let lbpos = command.indexOf("(");
        let argString = actual.substr(lbpos + 1, actual.length - lbpos - 2);

        // Actual command name
        actual = actual.substr(0, lbpos);

        // Arguments of choose() command
        let arguments = argString.split(/\s*,{1}\s*/);

        // Break the command into the command body and argument.
        switch (actual) {

            // Eat() command
            case "eat":
                if(GAMEVALS.get("Food") > 0) {
                    subtractFromValue("Food", 1);
                    addToValue("Hunger", 5);
                }
                emptyCommand(command)
                break;

            // RaiseSecurity() command
            case "raisesecurity":
                if (GAMEVALS.get("Security") < 5) {
                    addToValue("Security", 1);
                }
                emptyCommand(command)
                break;

            // Snapshot() command
            case "snapshot":
                createVisualizer();
                emptyCommand(command)
                break;

            // Choose() command with parameters
            case "choose":
                console.log(arguments);
                console.log(typeof arguments);
                //if(!responded) {

                var choiceOption = 0;
                try {
                    choiceOption = parseInt(arguments.shift());
                }
                catch(e) {

                }
                changeStats(currPrompt.Choice[choiceOption - 1]);
                addResult(currPrompt.Choice[choiceOption - 1].Result);
                getNextPrompt();
                checkGameStatus();

                addPrompt(currPrompt.Prompt);

                emptyCommand(command)
        }
    }
}

// Function for switching to next prompt
function getNextPrompt() {
    let nextPrompt = currPrompt.NextPrompt;
    currPrompt = prompts[nextPrompt];
}

// Function for changing values base on choice
function changeStats(choice) {
    addToValue("Food", choice.Food);
    addToValue("Security", choice.Security);
    addToValue("Population", choice.Population);
    addToValue("Military", choice.Military);
    addToValue("Science", choice.Science);
}

// Function for adding text to prompt
function addPrompt(prompt) {

    document.getElementById("promptBox").textContent += prompt;
    document.getElementById("promptBox").style.minHeight = (document.getElementById("promptBox").scrollHeight) + "px";
}

// Function for adding prompt result text
function addResult(choice) {
    document.getElementById("promptBox").textContent += choice;
}
// Function for replacing choose command with empty text
function emptyCommand(command) {
    let text = document.getElementById("textEditorBox").textContent;
    document.getElementById("textEditorBox").textContent = text.replace(command,"");
}

// Function for making snapshot visualizer
function createVisualizer() {
    let visCanvas = document.createElement('canvas');
    visCanvas.id = "snapshotCTX";
    visCanvas.width = 350;
    visCanvas.height = 150;

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(visCanvas);
    //This is fine..

    drawSnapshot();
}
