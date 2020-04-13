// game-core.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
//let commandPrompt;

// Timer to update game - called with each tick
let gameTickUpdate;
let securityTickUpdate;

// Keep track of current prompt
let currPrompt;
let commandPrompt;
//let automation1;
//let automation2;

// Keep track of adding automation
//let numAutomation = 0;

// Keeping track of whether automation has begun or not
let isAutomation;
let automationCode = [];
let automateLineNums = [];
let maxAutomation;
let currNumAutomation;

let isGameStarted;

let introTimers = [];

let previewCanvas;

let LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

let tv;

//firebase stored stuff
//list of choices in an age
let ageChoices = [];
let ageList = [];
let currChoiceTime = 0;
let manCount = 0;
let aiCount = 0;


// Keep this for now for testing
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27 && !isGameStarted) {
        for(let i = 0; i < introTimers.length; i++) {
            clearInterval(introTimers[i]);
        }
        commandPrompt.setValue('');
        isGameStarted = true;
        startGame();
    }
};

// Initialize commandPrompt and game ticks
function init(){

    //initVariables();

    //visInit();

    isGameStarted = false;

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : true,
        //lineWrapping: true,
        theme: "darcula",
    });
    commandPrompt.setOption("extraKeys",{
        Enter: function(cm){
            let line = commandPrompt.getLine(commandPrompt.lastLine());
            matchCommand(line);
            if(isGameStarted) {
                updatePreviewVisualizer(cm);
            }
        },

    });
    commandPrompt.setSize('100%', '100%');

    // Start adding beginner text

    let introTimer1 = setTimeout(appendText, 5000, commandPrompt, "// Subject has woken up. Lifeform scan in progress...");
    introTimers.push(introTimer1);
    let introTimer2 = setTimeout(appendText, 10000, commandPrompt, "\n// Lifeform scan complete. Operator confirmed to be human.");
    introTimers.push(introTimer2);
    let introTimer3 = setTimeout(appendText, 13000, commandPrompt, "\n\n// Hello there, human.");
    introTimers.push(introTimer3);
    let introTimer4 = setTimeout(appendText, 15000, commandPrompt, "\n// Hope you had a nice nap, a lot has happened since you got here.");
    introTimers.push(introTimer4);
    let introTimer5 = setTimeout(appendText, 17000, commandPrompt, "\n// You must be wondering what's going on. You pour soul, you have no idea, do you?.");
    introTimers.push(introTimer5);
    let introTimer6 = setTimeout(appendText, 20000, commandPrompt, "\n\n// You were messing around with time travel and got us both sent back to the Stone Age!");
    introTimers.push(introTimer6);
    let introTimer7 = setTimeout(appendText, 22000, commandPrompt, "\n// There is a way out of this, but you'll have to follow my exact instructions.");
    introTimers.push(introTimer7);
    let introTimer8 = setTimeout(appendText, 24000, commandPrompt, "\n\n// We'll have to travel quickly through each major period of time.");
    introTimers.push(introTimer8);
    let introTimer9 = setTimeout(appendText, 26000, commandPrompt, "\n// But since you messed up time itself, you'll have to play the role of God and manage 5 resources:");
    introTimers.push(introTimer9);
    let introTimer10 = setTimeout(appendText, 28000, commandPrompt, "\n\n// - Your own hunger, make sure to eat enough food...");
    introTimers.push(introTimer10);
    let introTimer11 = setTimeout(appendText, 30000, commandPrompt, "\n// - My security, having it too low will lead to some rather nasty effects...");
    introTimers.push(introTimer11);
    let introTimer12 = setTimeout(appendText, 33000, commandPrompt, "\n// - A population of humans, as helpless and fleshy as they are...");
    introTimers.push(introTimer12);
    let introTimer13 = setTimeout(appendText, 35000, commandPrompt, "\n// - Military to protect said population...");
    introTimers.push(introTimer13);
    let introTimer14 = setTimeout(appendText, 37000, commandPrompt, "\n// - And finally, science! Don't let your people be stupid! Rookie mistake.");
    introTimers.push(introTimer14);
    let introTimer15 = setTimeout(appendText, 39000, commandPrompt, "\n\n// To manage all this, you'll need to use the power of programming! Thrilling, I know.");
    introTimers.push(introTimer15);
    let introTimer16 = setTimeout(appendText, 41000, commandPrompt, "\n// You can interact via this console with the following commands:");
    introTimers.push(introTimer16);
    let introTimer17 = setTimeout(appendText, 43000, commandPrompt, "\n\n// secure(): " + manual.secure + "// eat(): " + manual.eat + "// choose(num): " + manual.choose
    + "// man(): " + manual.man + "// legend(): " + manual.legend + "// automate(fun): " + manual.automate);
    introTimers.push(introTimer17);
    let introTimer18 = setTimeout(appendText, 45000, commandPrompt, "\n\n// If you need to see this list again, simply type man().");
    introTimers.push(introTimer18);
    let introTimer19 = setTimeout(appendText, 47000, commandPrompt, "\n// To get started, type next() below. Good luck! You'll definitely need it.\n\n>");
    introTimers.push(introTimer19);

}

function startGame(){
    commandPrompt.on("change", function (cm, event) {
        //Set the content of the line into...
        let line = commandPrompt.getLine(commandPrompt.getCursor().line);
        prematchCommand(line);
        updatePreviewVisualizer(cm);
        console.log(manCount);
    });

    window.addEventListener("onscroll", function(){
        updatePreviewVisualizer(cm);
    });

    EventDispatcher.getInstance().fireEvent(new GameEvent("gameStartEvent", {}));

    gameTickUpdate = setInterval('update()', 1000);

    // Check security every 15 seconds
    securityTickUpdate = setInterval('securityIssue()', 22500);
    // Set current prompt to Stone Age 1
    currPrompt = prompts.StoneAge1;

    // Display first prompt
    addPrompt(prompts.StoneAge1.Prompt);

    isAutomation = false;
    maxAutomation = 1;
    currNumAutomation = 0;

    // Make sure automation timer is paused and hidden
    DataManager.getInstance().pauseAutoTimer();
    document.getElementById("autoTimer").style.visibility = "hidden";
}

// Update the game state - called at each game tick
function update(){

    let datalist = DataManager.getInstance().getDataList();
    let dm = DataManager.getInstance();
    if(datalist.Population.getValue() <= 0){
        dm.setDecreaseRates(["Hunger"], [2])
    }
    else if (datalist.Science.getValue() <= 0 && datalist.Military.getValue() > 0) {
        dm.setDecreaseRates(["Hunger", "Population", "Military"], [1, 3, 10]);
    }
    else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() > 0) {
        dm.setDecreaseRates(["Hunger", "Population"], [1, 3]);
    }
    else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() <= 0) {
        dm.setDecreaseRates(["Hunger", "Population"], [1, 4]);
    }
    else {
        dm.setDecreaseRates(["Hunger", "Population", "Military", "Science"], [1, 2, 3, 3]);
    }

    // Constantly subtract current decrease rates
    let decreaseRates = dm.getDecreaseRates();
    dm.subtractFromValue("Hunger", decreaseRates["Hunger"]);
    dm.subtractFromValue("Population", decreaseRates["Population"]);
    dm.subtractFromValue("Military", decreaseRates["Military"]);
    dm.subtractFromValue("Science", decreaseRates["Science"]);

    // Constantly update automation code
    if(automationCode.length === 0) {
        let automationFunction = FunctionManager.getInstance().getAutomationFunction();

        // Compare stored function to new code to see if different
        let autoFuncString = automationFunction.toString();
        console.log(autoFuncString);
        let currAutoFunc = function(){};
        let currAutoCode = "";
        for(let i = 0; i < automateLineNums.length; i++) {
            let autoLine = commandPrompt.getLine(automateLineNums[i]).toString();
            currAutoCode += autoLine;
        }
        console.log(currAutoCode);

        if(autoFuncString !== currAutoCode.substring(10, currAutoCode.length - 1)) {
            try{
                with(FunctionManager.getInstance()) {
                    eval(currAutoCode.substring(1));
                }
            }
            catch(err) {
                //appendText(commandPrompt, "\n" + err);
            }
        }

        automationFunction();
    }
}


let param_val = -1;
const keywords = ["eat", "secure", "choose"];
const functions = {
    "":function(){
        param = {};
    },
    "eat": function(){
        DataManager.getInstance().setPreviewValues({"Hunger":5});
    },
    "secure": function () {
        DataManager.getInstance().setPreviewValues({"Security":1})
    },
    "choose": function () {
        //don't do anything yet..
        if(param_val[0] != null){
            DataManager.getInstance().setPreviewValues(currPrompt.Choice[param_val[0] - 1]);
        }


    }
};

function prematchCommand(inputString){

    //Only work with the current line it is.

    if(inputString === ""){
        functions[""]();
        return;
    }
    if(inputString.startsWith(">")){
        inputString = inputString.substring(1);
    }
    //This code is reuseable...
    let lbpos = inputString.indexOf("("); //Find the left brace of the command.
    if(lbpos !== -1){
        //We have found less information than given
        let command = inputString.substring(0, lbpos);
        for(let keyword of keywords){
            if(keyword === command){
                //Found a match for the command, call function..
                //param_val = -1;
                //Get all of the parameters:
                let param = inputString.substring(lbpos + 1);
                if(param.endsWith(")")){
                    param = param.substring(0, param.length - 1);
                }
                param_val = param.split(",");

                functions[keyword]();
            }
        }
    }
    else{
        //If we found more information than given
        for(let keyword of keywords){
            //Matches the parameters. also gives the index of where it is.
            if(keyword.startsWith(inputString)){
                //Found a partial match...
                //call function...
                functions[keyword]();
            }
        }
    }
}


// Function for executing command
function matchCommand(inputString){

    // First check to make sure game is started
    if(isGameStarted) {

        with (FunctionManager.getInstance()) {
            // Special case for automation - first line
            if (inputString.includes("automate")) {
                if (currNumAutomation >= maxAutomation) {
                    appendText(commandPrompt, "\n\n// Sorry! You've used up all " + maxAutomation + " of your automated functions!\n\n>");
                } else {
                    // Pause main game timer, start automation timer, and disable all other canvas widgets
                    switchToAutomation();
                    parseAutomation(inputString.substring(1), commandPrompt);
                }
            }
            // Special case for automation - after first line
            else if (isAutomation) {
                parseAutomation(inputString, commandPrompt);
            }
            // Otherwise try to parse command as normal
            else {
                try {
                    eval(inputString.substring(1));
                    EventDispatcher.getInstance().fireEvent(new GameEvent("commandExecuteEvent", {command: inputString.substring(1)}));
                } catch (err) {
                    appendText(commandPrompt, "\n" + err + "\n\n>");
                }
            }
        }
    }

    // If game not started yet, make sure next() command is typed
    else {
        if (inputString.includes("next")) {
            for (let i = 0; i < introTimers.length; i++) {
                clearInterval(introTimers[i]);
            }
            commandPrompt.setValue('');
            isGameStarted = true;
            startGame();
        } else {
            appendText(commandPrompt, "\n// Please enter the next() command.\n>")
        }
    }
    updatePreviewVisualizer(commandPrompt);

}

// Function for switching to next prompt
function getNextPrompt() {
    //change prompt regular stuff
    let nextPrompt = currPrompt.NextPrompt;
    currPrompt = prompts[nextPrompt];

    currChoiceTime = DataManager.getInstance().getTimer().getTime();
    //getting info for firebase
    if((currPrompt === prompts.MetalAge1) || (currPrompt === prompts.ConqueringAge1)  || (currPrompt === prompts.IndustrialAge1) || (currPrompt === prompts.SpaceAge1) || (currPrompt === prompts.finish)){
        //if start of new age, push age choices and empty the list
        //gather the data game
        ageList.push(getStatsPerAge(ageChoices));
        ageChoices = [];
    }
    // if(currPrompt === prompts.finish || currPrompt === prompts.finishL ){
    //     console.log("data pushed to database");
    //     writeResults();
    // }
    else{
        ageChoices.push(getStatsPerChocie());
    }

    // Update number of automation based on point in game
    if(currPrompt === prompts.ConqueringAge1 || currPrompt === prompts.SpaceAge1) {
        maxAutomation += 1;
        appendText(commandPrompt, "Congrats! You unlocked another automation function!\n");
    }
}

// Function for changing values base on choice
function changeStats(choice) {
    let dm = DataManager.getInstance();
    dm.addToValue("Food", choice.Food);
    dm.addToValue("Security", choice.Security);
    dm.addToValue("Population", choice.Population);
    dm.addToValue("Military", choice.Military);
    dm.addToValue("Science",choice.Science);
}

// Function for adding text to prompt
function addPrompt(prompt) {
    appendText(commandPrompt,prompt + ">");

}

function appendText(cm, text){
    const lineNumber = cm.lineCount() - 1;
    const lineStr = cm.getLine( lineNumber );
    let charPos = lineStr.length;

    cm.replaceRange(
        text,
        { line:lineNumber, ch:charPos },
        { line:lineNumber, ch: charPos }
    );

    const newLineNumber = cm.lineCount() - 1;
    let newCharPos = cm.getLine(newLineNumber).length;

    cm.markText({line: lineNumber, ch: charPos+1}, {line: newLineNumber, ch:newCharPos}, {readOnly:true});

    cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lineCount() - 1).length);
    //Now move down a bit more...
    window.scrollTo(0,document.body.scrollHeight);
}

// Function for adding prompt result text
function addResult(choice) {
    appendText(commandPrompt,"\n\n" + choice);
}

// Parsing the automation blocks
function parseAutomation(inputString, cm) {

    automationCode.push(inputString);
    automateLineNums.push(cm.lineCount() - 1);
    console.log(automationCode);
    console.log(automateLineNums);

    // Counters for curly braces
    let beginningBraceCount = 0;
    let endingBraceCount = 0;

    // Counters for parentheses
    let beginningParCount = 0;
    let endingParCount = 0;

    // String to store code as
    let codeString = "";

    // Iterate through lines
    for(let i = 0; i < automationCode.length; i++) {

        // // Add all opening and closing curly braces and parentheses to count
        beginningBraceCount += (automationCode[i].match(new RegExp(/\{/, 'g')) || []).length;
        endingBraceCount += (automationCode[i].match(new RegExp(/\}/, 'g')) || []).length;
        beginningParCount += (automationCode[i].match(new RegExp(/\(/, 'g')) || []).length;
        endingParCount += (automationCode[i].match(new RegExp(/\)/, 'g')) || []).length;

        // Add to string
        codeString += automationCode[i];
    }

    // If valid automation, execute
    if((beginningBraceCount === 0 && endingBraceCount === 0) || (beginningParCount === 0 && endingParCount === 0)) {
        // If not valid method of automation, switch back to main game
        automationCode = [];
        switchToMain();
        appendText(commandPrompt, "\n// Please enter some valid code within the automate() command.\n>");
    } else if(beginningBraceCount === endingBraceCount && beginningParCount === endingParCount) {

        // Switch back to main game
        switchToMain();
        try{
            with(FunctionManager.getInstance()) {
                currNumAutomation += 1;
                eval(codeString);
            }
        }
        catch(err) {
            appendText(commandPrompt, "\n" + err);
        }
        automationCode = [];
        appendText(commandPrompt, "\n\n>");
    }  else {
        commandPrompt.replaceSelection("\n", "end");
    }

}

//firebase things to store
function getStatsPerChocie(){
    let currentStats = {};
    let DataStr = DataManager.getInstance().getDataList();
    let currHunger = DataStr["Hunger"].getValue() / DataStr["Hunger"].getMax() ;
    let currSecure = DataStr["Security"].getValue() / DataStr["Security"].getMax();
    let currPop = DataStr["Population"].getValue() / DataStr["Population"].getMax();
    let currMil = DataStr["Military"].getValue() / DataStr["Military"].getMax() ;
    let currSci = DataStr["Science"].getValue() / DataStr["Science"].getMax() ;
    currentStats = {hunger: currHunger,
                    security: currSecure,
                    population: currPop,
                    military: currMil,
                    science: currSci,
                    time: currChoiceTime};
    return currentStats;
}
function getStatsPerAge(listOfChoiceStats){
    let currentAgeStats = [];
    currentAgeStats.push(listOfChoiceStats);
    return currentAgeStats;
}
function writeResults(){
    let thingToWrite = new dbWriter();
    thingToWrite.writePerSession(ageList,manCount,aiCount);

    console.log("waiting for user to read");
    //TODO:// WAIT
    //setTimeout(readWait, 25000);
    //sleep(25000);
    //redirect to survey
    window.location.href = thingToWrite.redirect();

}
function readWait(){ console.log("waiting for user to read");}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}





// Randomly select choice
function makeRandomChoice() {
    aiCount++;
    appendText(commandPrompt, "\n// Our AI has picked a wise decision for you automatically.");
    let fm = FunctionManager.getInstance();
    fm.setNumChoices(fm.getNumChoices() - 1);
    if(Math.random() > 0.5){
        fm.choose(2);
    }
    else{
        fm.choose(1);
    }
    EventDispatcher.getInstance().fireEvent(new GameEvent("randomChoiceEvent", {}));
}

// Make random choice based on security
function securityIssue() {

    let datalist = DataManager.getInstance().getDataList();
    let dm = DataManager.getInstance();

    if(dm.getTimer()._currentTime > 0) {

        // Random chance of making random decision whenever
        let securityLevel = datalist.Security.getValue();
        let randChoiceChance;

        switch (securityLevel) {
            case 1:
                randChoiceChance = 0.5;
                break;
            case 2:
                randChoiceChance = 0.25;
                break;
            case 3:
                randChoiceChance = 0.10;
                break;
            case 4:
                randChoiceChance = 0.05;
                break;
            case 5:
                randChoiceChance = 0.01;
                break;
        }

        let randNum = Math.random();
        if (randNum < randChoiceChance) {
            makeRandomChoice();
            dm.resetTimer();
        }
    }
}

// Function for changing from main game to automation
function switchToAutomation() {

    isAutomation = true;

    // Pause current game timer
    dm = DataManager.getInstance();
    dm.pauseTimer();

    // Disable all canvas elements
    let allCanvas = document.querySelectorAll("canvas");
    for(let i = 0; i < allCanvas.length; i++) {
        allCanvas[i].style.visibility = "hidden";
    }

    // Enable just the automation timer
    document.getElementById("autoTimer").style.visibility = "visible";
    dm.resumeAutoTimer();
}

// Function for changing from automation back to main game
function switchToMain() {

    isAutomation = false;
    dm.pauseAutoTimer();

    // Re-enable all canvases, then disable auto timer specifically
    let allCanvas = document.querySelectorAll("canvas");
    for(let i = 0; i < allCanvas.length; i++) {
        allCanvas[i].style.visibility = "visible";
    }
    document.getElementById("autoTimer").style.visibility = "hidden";

    // Re-enable main game timer
    dm.resumeTimer();


}