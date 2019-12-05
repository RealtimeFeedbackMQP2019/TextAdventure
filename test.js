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

//TODO: PLEASE MAP THIS VALUE TO THE DECREASE VALUE FUNCTIONS INSTEAD
//TODO: BECASUE VISUALIZING THINGS CAN BE EASIER THIS WAY,
//TODO: AND WE CAN EASILY ADD IN OR REMOVE VALUES FROM THIS LIST.

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
    updateVariables();
}


function updateVariables(){
    for(var x of LIST_OF_VALS){
        document.getElementById(x).innerHTML = GAMEVALS.get(x);
    }
}

// Decrease hunger
function decreaseHunger(numDecrease){

    // If Hunger reaches 0, trigger Game Over
    if(GAMEVALS.get("Hunger") <= 0){
        clearInterval(gameTickUpdate);
        document.getElementById("gameOver").style.display = "inline";
        // Somehow disable commands from being entered
    } else {
        //Values.HUNGER -= numDecrease;
        addToValue("Hunger", -numDecrease);
    }
}

// Decrease population
function decreasePopulation(numDecrease){
    addToValue("Population", -numDecrease);
}

// Decrease military
function decreaseMilitary(numDecrease){
    addToValue("Military", -numDecrease);
}

// Decrease science
function decreaseScience(numDecrease){
    addToValue("Science", -numDecrease);
}

function addToValue(key, value){
    GAMEVALS.set(key, GAMEVALS.get(key) + value);
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