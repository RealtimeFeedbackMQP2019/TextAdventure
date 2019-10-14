// test.js - sandbox for testing core functionality of text-based simulation

// Timer for decreasing hunger
//var hungerTimer = setInterval('decreaseHunger()', 1000);

// Code Mirror - command prompt functionality
var commandPrompt;
var HUNGER = 20;
var FOOD = 5;

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
    HUNGER -= 1;
    console.log(HUNGER);
    document.getElementById("hunger").innerHTML = HUNGER;


    if(HUNGER <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").style.display = "inline";
    }
}

// Function for doing command
function startCommand(event) {
    var command = commandPrompt.getValue();

    // Eat() command
    if(command === "Eat()") {
        FOOD -= 1;
        document.getElementById("foodLeft").innerHTML = FOOD;
        HUNGER += 5;
        document.getElementById("hunger").innerHTML = HUNGER;
    }
}