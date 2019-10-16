// test.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
var commandPrompt;

// Stats and other values to keep track of
var Values = {
    HUNGER: 20,
    FOOD: 5,
    SECURITY: 3,
    POPULATION: 1000,
    MILITARY: 100,
    SCIENCE: 50
};

// Commands to choose from
var commands = ["eat", "raiseSecurity", "execute"];

// Timer to update game - called with eack tick
var gameTickUpdate;

// Initialize commandPrompt and game ticks
function init(){

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : false
    });
    commandPrompt.setOption("extraKeys",{
       Enter: function(cm){
           var line = commandPrompt.getLine(0);
           startCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });
    commandPrompt.

    gameTickUpdate = setInterval('update()', 1000);
}

// Update the game state - called at each game tick
function update(){
    if(Values.POPULATION <= 0) decreaseHunger(2);
    else if (Values.SCIENCE <= 0 && Values.MILITARY > 0) {
        decreaseMilitary(10);
        decreasePopulation(75);
        decreaseHunger(1);
    }
    else if (Values.MILITARY <= 0 && Values.SCIENCE > 0) {
        decreasePopulation(75);
        decreaseHunger(1);
    }
    else if (Values.MILITARY <= 0 && Values.SCIENCE <= 0) {
        decreasePopulation(100);
        decreaseHunger(1);
    }
    else {
        decreaseHunger(1);
        decreasePopulation(50);
        decreaseMilitary(5);
        decreaseScience(5);
    }
}

// Decrease hunger
function decreaseHunger(numDecrease){

    // If Hunger reaches 0, trigger Game Over
    if(Values.HUNGER <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").style.display = "inline";
        // Somehow disable commands from being entered
    } else {
        Values.HUNGER -= numDecrease;
        document.getElementById("hunger").innerHTML = Values.HUNGER;
    }
}

// Decrease population
function decreasePopulation(numDecrease){
    Values.POPULATION -= numDecrease;
    document.getElementById("population").innerHTML = Values.POPULATION;
}

// Decrease military
function decreaseMilitary(numDecrease){
    Values.MILITARY -= numDecrease;
    document.getElementById("military").innerHTML = Values.MILITARY;
}

// Decrease science
function decreaseScience(numDecrease){
    Values.SCIENCE -= numDecrease;
    document.getElementById("science").innerHTML = Values.SCIENCE;
}

// Function for doing command
function startCommand(event) {
    var command = commandPrompt.getValue();

    // Eat() command
    if(command === "Eat()" && Values.FOOD > 0) {
        Values.FOOD -= 1;
        document.getElementById("foodLeft").innerHTML = Values.FOOD;
        Values.HUNGER += 5;
        document.getElementById("hunger").innerHTML = Values.HUNGER;
    }
    else if(command === "RaiseSecurity()" && Values.SECURITY < 5)  {
        Values.SECURITY += 1;
        document.getElementById("security").innerHTML = Values.SECURITY;
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