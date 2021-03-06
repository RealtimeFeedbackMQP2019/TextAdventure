// game-core.js - sandbox for testing core functionality of text-based simulation

// Timer to update game - called with each tick
let gameTickUpdate;
let securityTickUpdate;
const gameTickInterval = 1000;
const securityTickInterval = 30000;
let securityTickRemaining;
let startTime;

// Keep track of current prompt
let currPrompt;
let commandPrompt;

// Keep track of adding automation
//let numAutomation = 0;

// Keeping track of whether automation has begun or not
let isAutomation;

// Storing automation code and line numbers, as well as max and current numbers of automation
let automationCode = {
    "0": [],
    "1": [],
    "2": [],
    "3": []
};
let automateLineNums = {
    "0": [],
    "1": [],
    "2": [],
    "3": []
};
let maxAutomation;
let currNumAutomation;
let finishedAutomation;
let autoError;

let isGameStarted;
let gameRunning;
let introduceAuto;
let autoIntroduced;
let autoStartLineNum;
let introAutoStartLineNum;
let pauseChooseVal;
let validAuto;

let introTimers = [];

let previewCanvas;

let LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

let tv;

//firebase stored stuff
//list of choices in an age
let ageChoices = [];
let ageList = [];
//let currChoiceTime = 0;
let manCount = 0;
let aiCount = 0;

// Keep this for now for testing
document.onkeydown = function(evt) {
    evt = evt || window.event;
    // Hitting ESC
    if (evt.keyCode === 27) {
        // Skipping game intro
        if (!isGameStarted) {
            for (let i = 0; i < introTimers.length; i++) {
                clearInterval(introTimers[i]);
            }
            commandPrompt.setValue('');
            isGameStarted = true;
            startGame();
        }
        // Exiting automation
        else if(isAutomation) {
            commandPrompt.replaceRange("", {line:automateLineNums[currNumAutomation][0], ch:0},
                {line:commandPrompt.lineCount(), ch:0});
            switchToMain();
        }
    }
};

// Initialize commandPrompt and game ticks
function init(){

    //initVariables();

    //visInit();

    isGameStarted = false;

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : true,
        lineWrapping: true,
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

    let introTimer1 = setTimeout(appendText, 5000, commandPrompt, "// (PRESS ESC TO SKIP)\n// Subject has woken up. Lifeform scan in progress...");
    introTimers.push(introTimer1);
    let introTimer2 = setTimeout(appendText, 10000, commandPrompt, "\n// Lifeform scan complete. Operator confirmed to be human.");
    introTimers.push(introTimer2);
    let introTimer3 = setTimeout(appendText, 13000, commandPrompt, "\n\n// Hello there, human.");
    introTimers.push(introTimer3);
    let introTimer4 = setTimeout(appendText, 15000, commandPrompt, "\n// Hope you had a nice nap, a lot has happened since you got here.");
    introTimers.push(introTimer4);
    let introTimer5 = setTimeout(appendText, 17000, commandPrompt, "\n// You must be wondering what's going on. You poor soul, you have no idea, do you?");
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
    + "// man(): " + manual.man + "// legend(): " + manual.legend);
    introTimers.push(introTimer17);
    let introTimer18 = setTimeout(appendText, 45000, commandPrompt, "\n\n// If you need to see this list again, simply type man().");
    introTimers.push(introTimer18);
    let introTimer19 = setTimeout(appendText, 47000, commandPrompt, "\n// To get started, type next() below. Good luck! You'll definitely need it.\n\n>");
    introTimers.push(introTimer19);

}

let currentPos = 0;
let prevPos = 0;

function startGame(){
    commandPrompt.on("change", function (cm, event) {
        //Set the content of the line into...
        let line = commandPrompt.getLine(commandPrompt.getCursor().line);
        prematchCommand(line);
        updatePreviewVisualizer(cm);
        //console.log(manCount);
    });




    window.addEventListener("scroll", function(){
        //prevPos = currentPos;
        updatePreviewVisualizer(commandPrompt);
        //currentPos = document.body.scrollTop;
        //console.log(currentPos - prevPos);
    });

    EventDispatcher.getInstance().fireEvent(new GameEvent("gameStartEvent", {}));

    gameTickUpdate = setInterval('update()', gameTickInterval);

    // Check security every 15 seconds
    securityTickUpdate = setInterval('securityIssue()', securityTickInterval);
    // Set current prompt to Stone Age 1
    currPrompt = prompts.StoneAge1;

    // Display first prompt
    addPrompt(prompts.StoneAge1.Prompt);

    isAutomation = false;
    maxAutomation = 0;
    currNumAutomation = 0;
    finishedAutomation = true;
    autoError = false;
    gameRunning = true;
    introduceAuto = false;
    autoIntroduced = false;
    autoStartLineNum = 0;
    introAutoStartLineNum = 0;
    pauseChooseVal = 0;
    validAuto = false;

    let d = new Date;
    startTime = d.getTime();

    // Make sure automation timer is paused and hidden
    DataManager.getInstance().pauseAutoTimer();
    document.getElementById("autoTimer").style.visibility = "hidden";
}

// Update the game state - called at each game tick
function update(){

    let datalist = DataManager.getInstance().getDataList();
    let dm = DataManager.getInstance();

    // Always check for game status first
    dm.checkGameStatus();

    if (datalist.Population.getValue() <= 0) {
        dm.setDecreaseRates(["Hunger"], [2])
    } else if (datalist.Science.getValue() <= 0 && datalist.Military.getValue() > 0) {
        dm.setDecreaseRates(["Hunger", "Population", "Military"], [1, 2, 4]);
    } else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() > 0) {
        dm.setDecreaseRates(["Hunger", "Population"], [1, 2]);
    } else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() <= 0) {
        dm.setDecreaseRates(["Hunger", "Population"], [1, 3]);
    } else {
        dm.setDecreaseRates(["Hunger", "Population", "Military", "Science"], [1, 1, 2, 2]);
    }

    // Constantly subtract current decrease rates (unless game win/lose condition)
    if(gameRunning) {
        let decreaseRates = dm.getDecreaseRates();
        dm.subtractFromValue("Hunger", decreaseRates["Hunger"]);
        dm.subtractFromValue("Population", decreaseRates["Population"]);
        dm.subtractFromValue("Military", decreaseRates["Military"]);
        dm.subtractFromValue("Science", decreaseRates["Science"]);
    }

    // Constantly update automation code - get all automated functions
    updateAutomation();
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

    // Normal game conditions - game started, not introducing automation
    if(isGameStarted && !introduceAuto) {

        with (FunctionManager.getInstance()) {
            // Special case for automation - first line
            if (inputString.includes("automate")) {
                if(!autoIntroduced) {
                    appendText(commandPrompt, "\n\n// Haha not breaking the game this way!\n\n", "color: #FFFF00");
                    appendText(commandPrompt, ">");
                } else if (currNumAutomation >= maxAutomation) {
                    appendText(commandPrompt, "\n\n// Sorry! You've used up all " + maxAutomation + " of your automated functions!\n\n", "color: #FFFF00");
                    appendText(commandPrompt, ">");
                } else {
                    // Pause main game timer, start automation timer, and disable all other canvas widgets
                    switchToAutomation();
                    autoStartLineNum = commandPrompt.lineCount();
                    //console.log(autoStartLineNum);
                    parseAutomation(inputString, commandPrompt);
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

    // If introducing automation
    else if(isGameStarted && introduceAuto) {
        if (inputString.includes("next")) {
            introduceAuto = false;
            autoIntroduced = true;
            // Finish choose command
            FunctionManager.getInstance().choose(pauseChooseVal);
        } else {
            appendText(commandPrompt, "\n// Please enter the next() command to continue.\n", "color: #FFFF00");
            appendText(commandPrompt, ">");
        }
    }

    // If game not started yet, make sure next() command is typed
    else if(!isGameStarted) {
        if (inputString.includes("next")) {
            for (let i = 0; i < introTimers.length; i++) {
                clearInterval(introTimers[i]);
            }
            commandPrompt.setValue('');
            isGameStarted = true;
            startGame();
        } else {
            appendText(commandPrompt, "\n// Please enter the next() command to continue.\n>")
        }
    }
    updatePreviewVisualizer(commandPrompt);

}

// Function for switching to next prompt
function getNextPrompt() {
    //change prompt regular stuff
    let nextPrompt = currPrompt.NextPrompt;
    currPrompt = prompts[nextPrompt];


    //getting info for firebase
    if((currPrompt === prompts.MetalAge1) || (currPrompt === prompts.ConqueringAge1)  || (currPrompt === prompts.IndustrialAge1) || (currPrompt === prompts.SpaceAge1) || (currPrompt === prompts.finish)){
        //if start of new age, push age choices and empty the list
        //gather the data game
        ageList.push(ageChoices);
        ageChoices = [];
    }
    // if(currPrompt === prompts.finish || currPrompt === prompts.finishL ){
    //     console.log("data pushed to database");
    //     writeResults();
    // }
    else{
        ageChoices.push(getStatsPerChoice());
    }

    if(currPrompt === prompts.ConqueringAge1 || currPrompt === prompts.IndustrialAge1 || currPrompt === prompts.SpaceAge1) {
        maxAutomation += 1;
        appendText(commandPrompt, "// Congrats! You unlocked another automation function!\n\n", "color: #FFFF00");
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

function appendText(cm, text, style){
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

    if(style != null){
        cm.markText({line: lineNumber, ch: charPos}, {line: newLineNumber, ch:newCharPos}, {readOnly:true, css:style});
    }
    else{
        cm.markText({line: lineNumber, ch: charPos}, {line: newLineNumber, ch:newCharPos}, {readOnly:true});
    }


    cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lineCount() - 1).length);
    //Now move down a bit more...
    window.scrollTo(0,document.body.scrollHeight);
}

function appendWidget(item){
    const lineNumber = commandPrompt.lineCount() - 1;
    const lineStr = commandPrompt.getLine( lineNumber );
    let charPos = lineStr.length;

    commandPrompt.markText(

        { line: lineNumber, ch:charPos - 1},
        { line:lineNumber, ch:charPos },
        { replacedWith: item }
    );
}

// Function for adding prompt result text
function addResult(choice) {
    appendText(commandPrompt, choice);
}

// Parsing the automation blocks
function parseAutomation(inputString, cm) {

    // Empty arrays first
    automationCode[currNumAutomation] = [];
    automateLineNums[currNumAutomation] = [];

    // Every time enter is pressed, re-evaluate all automation code and line numbers
    for(let a = autoStartLineNum; a < commandPrompt.lineCount() + 1; a++) {
        automationCode[currNumAutomation].push(commandPrompt.getLine(a-1));
        automateLineNums[currNumAutomation].push(a);
    }

    // Counters for curly braces
    let beginningBraceCount = 0;
    let endingBraceCount = 0;

    // Counters for parentheses
    let beginningParCount = 0;
    let endingParCount = 0;

    // String to store code as
    let codeString = "";

    // Iterate through lines
    for(let i = 0; i < automationCode[currNumAutomation].length; i++) {

        // // Add all opening and closing curly braces and parentheses to count
        beginningBraceCount += (automationCode[currNumAutomation][i].match(new RegExp(/\{/, 'g')) || []).length;
        endingBraceCount += (automationCode[currNumAutomation][i].match(new RegExp(/\}/, 'g')) || []).length;
        beginningParCount += (automationCode[currNumAutomation][i].match(new RegExp(/\(/, 'g')) || []).length;
        endingParCount += (automationCode[currNumAutomation][i].match(new RegExp(/\)/, 'g')) || []).length;

        // Add to string
        codeString += automationCode[currNumAutomation][i];
    }

    //console.log(codeString.substring(1));

    // If valid automation, execute
    if((beginningBraceCount === 0 && endingBraceCount === 0) || (beginningParCount === 0 && endingParCount === 0)) {
        // If not valid method of automation, switch back to main game
        automationCode[currNumAutomation] = [];
        automateLineNums[currNumAutomation] = [];
        switchToMain();
        appendText(commandPrompt, "\n// Please enter some valid code within the automate() command.\n", "color: #FFFF00");
        appendText(commandPrompt, ">");
    } else if(beginningBraceCount === endingBraceCount && beginningParCount === endingParCount) {

        try{
            with(FunctionManager.getInstance()) {
                currNumAutomation += 1;
                console.log(currNumAutomation);
                autoError = true;
                FunctionManager.getInstance().setCurrAutoIndex(currNumAutomation-1);
                console.log(FunctionManager.getInstance().getCurrAutoIndex());
                // console.log(FunctionManager.getInstance().getAutomationFunctions());
                eval(codeString.substring(1));
                //validAuto = true;
            }
        }
        catch(err) {
            appendText(commandPrompt, "\n" + err, "color: #FFFF00");
            automationCode[currNumAutomation] = [];
            automateLineNums[currNumAutomation] = [];
            let emptyFunc = function(){};
            FunctionManager.getInstance().setAutomationFunction(currNumAutomation.toString(), emptyFunc);
            currNumAutomation -= 1;
        }
        // Switch back to main game - if set to true, add congrats text
        switchToMain();
        appendText(commandPrompt, "\n\n>");
    }  else {
        commandPrompt.replaceSelection("\n", "end");
    }

}

//firebase things to store
function getStatsPerChoice(){
    let currentStats = {};
    let DataStr = DataManager.getInstance().getDataList();
    let currHunger = DataStr["Hunger"].getValue() / DataStr["Hunger"].getMax() ;
    let currSecure = DataStr["Security"].getValue() / DataStr["Security"].getMax();
    let currPop = DataStr["Population"].getValue() / DataStr["Population"].getMax();
    let currMil = DataStr["Military"].getValue() / DataStr["Military"].getMax() ;
    let currSci = DataStr["Science"].getValue() / DataStr["Science"].getMax() ;
    let currChoiceTime = DataManager.getInstance().getTimer().getTime();
    currentStats = {hunger: currHunger,
                    security: currSecure,
                    population: currPop,
                    military: currMil,
                    science: currSci,
                    time: currChoiceTime};
    return currentStats;
}
// function getStatsPerAge(listOfChoiceStats){
//     let currentAgeStats = [];
//     currentAgeStats.push(listOfChoiceStats);
//     return currentAgeStats;
// }
function writeResults(){
    let thingToWrite = new dbWriter();
    thingToWrite.writePerSession(ageList,manCount,aiCount);
    
    //redirect to survey or refresh the page
    window.location.href = thingToWrite.redirect();

}

// Randomly select choice
function makeRandomChoice() {
    aiCount++;
    appendText(commandPrompt, "\n// Our AI has picked a wise decision for you automatically.", "color: #478ee6");
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

// Helper function for checking for updates in automated code
function updateAutomation(){

    let autoFunctions = FunctionManager.getInstance().getAutomationFunctions();
    console.log(autoFunctions["0"]);
    let autoKeys = Object.keys(autoFunctions);
    for(let key in autoKeys) {

        // Compare stored function to new code to see if different
        let autoFuncString = autoFunctions[key].toString();
        let currAutoCode = "";
        for (let i = 0; i < automateLineNums[key].length; i++) {
            let autoLine = commandPrompt.getLine(automateLineNums[key][i]-1).toString();
            currAutoCode += autoLine;
        }
        console.log(currAutoCode);

        // If they're not equal, store as new auto function re-evaluate
        if ((autoFuncString !== currAutoCode.substring(10, currAutoCode.length - 1)) && currAutoCode !== "") {
            autoError = true;
            try {
                with (FunctionManager.getInstance()) {
                    FunctionManager.getInstance().setCurrAutoIndex(parseInt(key));
                    eval(currAutoCode.substring(1));
                }
            } catch (err) {
                if(autoError) {
                    //appendText(commandPrompt, "\n" + err, "color: #FFFF00");
                    //autoError = false;
                }
            }
        }

        // Execute each function
        let autoFunction = autoFunctions[key];

        // Try to execute, but if error, empty
        try {
            with(FunctionManager.getInstance()) {
                autoFunction();
            }
        }
        catch(err) {
            if(autoError) {
                validAuto = false;
                //appendText(commandPrompt, "\n" + err + "\n>", "color: #FFFF00");
                //automationCode[key] = [];
                //automateLineNums[key] = [];
                let emptyFunc = function(){};
                FunctionManager.getInstance().setAutomationFunction(key, emptyFunc);
                currNumAutomation -= 1;
                autoError = false;
            }
        }

        // // Add text for valid automation
        // if(validAuto) {
        //     appendText(commandPrompt, "\n// Congrats! You're automated function is running correctly!\n\n>");
        //     validAuto = false;
        // }
    }
}

// Helper function for introducing automation
function introduceAutomation(chooseVal) {

    // Pause main gamer timer
    DataManager.getInstance().pauseTimer();

    // Set line number
    introAutoStartLineNum = commandPrompt.lineCount();

    appendText(commandPrompt,
        "\n\n// ***ALERT!******ALERT!******ALERT!******ALERT!******ALERT!******ALERT!***\n\n" +
        "// Congrats human! By making it this far, I've been able to\n" +
        "// upgrade my system so you can write your own basic automated functions!\n\n" +
        "// By typing the automate() command with an anonymous function inside,\n" +
        "// I can continuously call these functions to automate some processes for you!\n" +
        "// For example:\n\n" +
        "// automate(function() {\n" +
        "// if((getValue('Hunger') < 10) && (getValue('Food') > 5)){\n" +
        "// eat();\n" +
        "// }\n" +
        "// })\n\n" +
        "// This function will automatically let you eat food if your hunger is below 10\n" +
        "// and if you have more than 5 pieces of food. Make sense?\n\n" +
        "// Just follow a similar syntax with matching brackets {} and parentheses ()\n" +
        "// and it should work! You can also go back to old functions you wrote\n" +
        "// and edit them, which will change the execution! Assuming it's correct, of course.\n\n" +
        "// You can access any of the statistics using getValue() and the name inside in quotes,\n" +
        "// as well as access the value of the timer with getTime().\n\n" +
        "// Keep in mind that you have a limited amount of time per prompt to write an\n" +
        "// automated function, and it runs on a separate timer from the main game.\n\n" +
        "// Type next() below to resume playing the game. Have fun experimenting!\n\n", "color: #FFFF00"
    );
    appendText(commandPrompt, ">");

}