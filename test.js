// test.js - sandbox for testing core functionality of text-based simulation

// Timer for decreasing hunger
var hungerTimer = setInterval('decreaseHunger()', 1000);

// Code Mirror - command prompt functionality
var commandPrompt;


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
       }
    });
}

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
}

// Function for doing command
function startCommand(event) {
    var command = commandPrompt.getValue();

    // Eat() command
    if(command === "Eat()") {
        var foodLeft = parseInt(document.getElementById("foodLeft").innerHTML);
        foodLeft -= 1;
        document.getElementById("foodLeft").innerHTML = foodLeft.toString();
        var hungerVal = parseInt(document.getElementById("hunger").innerHTML);
        hungerVal += 5;
        document.getElementById("hunger").innerHTML = hungerVal.toString();
    }
}