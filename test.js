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

const MAX = {
    HUNGER: 40,
    FOOD: 20,
    SECURITY: 5,
    POPULATION: 1000,
    MILITARY: 100,
    SCIENCE: 50
};




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
           matchCommand(line);
           commandPrompt.setValue("");
           commandPrompt.clearHistory();
       }
    });
    visInit();
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
            Values.FOOD -= 1;
            document.getElementById("foodLeft").innerHTML = Values.FOOD;
            Values.HUNGER += 5;
            document.getElementById("hunger").innerHTML = Values.HUNGER;
            break;

        // RaiseSecurity() command
        case "raisesecurity":
            if(Values.SECURITY < 5){
                Values.SECURITY += 1;
                document.getElementById("security").innerHTML = Values.SECURITY;
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
                        Values.MILITARY -= 5;
                        document.getElementById("military").innerHTML = Values.MILITARY;
                        document.getElementById("textPrompt").style.display = "none";
                        break;
                    case "2":
                        responded = true;
                        Values.POPULATION -= 30;
                        document.getElementById("population").innerHTML = Values.POPULATION;
                        Values.SCIENCE += 10;
                        document.getElementById("science").innerHTML = Values.SCIENCE;
                        document.getElementById("textPrompt").style.display = "none";
                        break;
                }
            }
    }
}