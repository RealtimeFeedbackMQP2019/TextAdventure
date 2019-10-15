// test.js - sandbox for testing core functionality of text-based simulation

// Timer for decreasing hunger
//var hungerTimer = setInterval('decreaseHunger()', 1000);

// Code Mirror - command prompt functionality
var commandPrompt;
//var HUNGER = 20;
//var FOOD = 5;

var Values = {
    HUNGER: 20,
    FOOD: 5
};

var commands = ["eat", "raiseSecurity", "execute"];

var gameTickUpdate;


function init(){

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : true
    });/*CodeMirror(document.getElementById("commandPrompt"), {
        value: "Hello, world!",
        mode: "javascript"
    });*/
    commandPrompt.setOption("extraKeys",{
       Enter: function(cm){
           var line = commandPrompt.getLine(0);
           startCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });

    gameTickUpdate = setInterval('update()', 1000);
}

function update(){
    decreaseHunger();

}

/*
// Decrease hunger
function decreaseHunger() {
    var hungerVal = parseInt(document.getElementById("hunger").innerHTML);
    hungerVal -= 1;
    document.getElementById("hunger").innerHTML = hungerVal.toString();

    // If hunger reaches 0, stop timer and game is over
    if(hungerVal === 0) {
        clearInterval(hungerTimer);
        document.getElementById("gameOver").style.display = "inline";
    }
}*/

function decreaseHunger(){
    Values.HUNGER -= 1;
    document.getElementById("hunger").innerHTML = Values.HUNGER;


    if(Values.HUNGER <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").style.display = "inline";
    }
}

// Function for doing command
function startCommand(event) {
    var command = commandPrompt.getValue();

    // Eat() command
    if(command === "Eat()") {
        //FOOD -= 1;
        Values.FOOD -= 1;
        document.getElementById("foodLeft").innerHTML = Values.FOOD;
        Values.HUNGER += 5;
        document.getElementById("hunger").innerHTML = Values.HUNGER;
    }
}

function matchCommand(command){
    var actual = command.toLowerCase();
    var lbpos = command.indexOf("(");
    var arg = actual.substr(lbpos, actual.length-1);
    actual = actual.substr(0, lbpos);
    //Break the command into the command body and argument.
    console.log(arg);
    console.log(actual);
    for(var s of commands){
        //Do regex, or just direct comparison.
        if(command === s){
            //Process command?
        }
    }
}