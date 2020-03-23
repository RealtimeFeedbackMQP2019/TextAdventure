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
let isAutomationFull;
let automationCode = [];
let automateLineNums = [];

let isGameStarted;

let previewCanvas;

let LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

let tv;

// Keep this for now for testing
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27 && !isGameStarted) {
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
            //commandPrompt.setValue(commandPrompt.getValue() + "\n\n>");
            updatePreviewVisualizer(cm);
        },

    });
    commandPrompt.setSize('100%', '100%');

    let manual = {
        "secure": "// Usage: secure(). Increase security by a level, when possible. The max security is level 5.",
        "eat": "// Usage: eat(). Decrease food by 1, but also increase hunger by a small amount.",
        "choose": "// Usage: choose(id), Make a choice from the list of choice given.",
        "man": "// Usage: man(command). Check the command's usage and description.",
        "legend": "// Usage: legend(). Look at the legend for the bar visual, with color coding for each statistic.",
        "automate": "// Usage: automate(function(){}) Automate an anonymous function to run with each game update, if the conditions are met."
    };

    // Start adding beginner text
    setTimeout(appendText, 5000, commandPrompt, "// Subject has woken up. Lifeform scan in progress...\n");
    setTimeout(appendText, 11000, commandPrompt, "// Lifeform scan complete. Operator confirmed to be human.\n\n");
    setTimeout(appendText, 14000, commandPrompt, "// Hello there, human. My name is PUT NAME HERE\n");
    setTimeout(appendText, 15000, commandPrompt, "// Hope you had a nice nap, a lot has happened since you got here.\n");
    setTimeout(appendText, 17000, commandPrompt, "// You must be wondering what's going on. Your pour soul, you have no idea, do you?.\n\n");
    setTimeout(appendText, 20000, commandPrompt, "// You were messing around with time travel and got us both sent back to the Stone Age!\n");
    setTimeout(appendText, 22000, commandPrompt, "// There is a way out of this, but you'll have to follow my exact instructions.\n\n");
    setTimeout(appendText, 24000, commandPrompt, "// We'll have to travel quickly through each major period of time.\n");
    setTimeout(appendText, 25000, commandPrompt, "// But since you messed up time itself, you'll have to play the role of God and manage 5 resources:\n\n");
    setTimeout(appendText, 27000, commandPrompt, "// - Your own hunger, make sure to eat enough food...\n");
    setTimeout(appendText, 29000, commandPrompt, "// - My security, having it too low will lead to some rather nasty effects...\n");
    setTimeout(appendText, 31000, commandPrompt, "// - A population of humans, as helpless and fleshy as they are...\n");
    setTimeout(appendText, 33000, commandPrompt, "// - Military to protect said population...\n");
    setTimeout(appendText, 35000, commandPrompt, "// - And finally, science! Don't let your people be stupid! Rookie mistake.\n\n");
    setTimeout(appendText, 37000, commandPrompt, "// To manage all this, you'll need to use the power of programming! Thrilling, I know.\n");
    setTimeout(appendText, 40000, commandPrompt, "// You can interact via this console with the following commands:\n\n");
    setTimeout(appendText, 41000, commandPrompt, JSON.stringify(manual) + "\n\n");
    setTimeout(appendText, 44000, commandPrompt, "// If you need to see this list again, simply type man().\n");
    setTimeout(appendText, 45000, commandPrompt, "// To get started, type next() below. Good luck! You'll definitely need it.\n\n>");

}

function startGame(){
    commandPrompt.on("change", function (cm, event) {
        //Set the content of the line into...
        let line = commandPrompt.getLine(commandPrompt.getCursor().line);
        prematchCommand(line);
        updatePreviewVisualizer(cm);

    });

    window.addEventListener("onscroll", function(){
        updatePreviewVisualizer(cm);
    });

    EventDispatcher.getInstance().fireEvent(new GameEvent("gameStartEvent", {}));

    /*
    //Setup timer
    let cv = document.getElementById("timer");
    tv = new TimerVisualizer(cv, 30);*/

    /*automation1 = CodeMirror.fromTextArea(document.getElementById("automation1"),{
        lineNumbers : true,
        lineWrapping: true,
        theme: "darcula"
    });
    automation1.setOption("extraKeys",{
        Enter: function(cm){
            let code = automation1.getValue().split('\n');
            console.log(code);
            parseAutomation(code);

        }
    });
    automation1.setSize('100%', '100%');

    automation2 = CodeMirror.fromTextArea(document.getElementById("automation2"),{
        lineNumbers : true,
        lineWrapping: true,
        theme: "darcula"
    });
    automation2.setOption("extraKeys",{
        Enter: function(cm){
            let code = automation2.getValue().split('\n');
            console.log(code);
            parseAutomation(code);

        }
    });
    automation2.setSize('100%', '100%');*/

    // Only set main console visible
    //commandPrompt.getWrapperElement().style.display = "block";
    // automation1.getWrapperElement().style.display = "none";
    // automation2.getWrapperElement().style.display = "none";
    // document.getElementById('references').style.display = "none";

    // Hide automation tabs as well
    // document.getElementById("automation1Tab").style.display = "none";
    // document.getElementById("automation2Tab").style.display = "none";

    gameTickUpdate = setInterval('update()', 1000);

    // Check security every 15 seconds
    securityTickUpdate = setInterval('securityIssue()', 15000);
    // Set current prompt to Stone Age 1
    currPrompt = prompts.StoneAge1;

    // Display first prompt
    addPrompt(prompts.StoneAge1.Prompt);

    // Initialize legend to be hidden
    //document.getElementById("legend").style.display = "none";

    isAutomation = false;
    isAutomationFull = false;
}

// Update the game state - called at each game tick
function update(){

    let datalist = DataManager.getInstance().getDataList();
    let dm = DataManager.getInstance();
    if(datalist.Population.getValue() <= 0){
        dm.subtractFromValue("Hunger", 2);
    }
    else if (datalist.Science.getValue() <= 0 && datalist.Military.getValue() > 0) {
        dm.subtractFromValue("Military", 10);
        dm.subtractFromValue("Population", 3);
        dm.subtractFromValue("Hunger", 1);
    }
    else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() > 0) {
        dm.subtractFromValue("Population", 3);
        dm.subtractFromValue("Hunger", 1);
    }
    else if (datalist.Military.getValue() <= 0 && datalist.Science.getValue() <= 0) {
        dm.subtractFromValue("Population", 4);
        dm.subtractFromValue("Hunger", 1);
    }
    else {
        dm.subtractFromValue("Hunger", 1);
        dm.subtractFromValue("Population", 2);
        dm.subtractFromValue("Military", 5);
        dm.subtractFromValue("Science", 5);
    }

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
                appendText(commandPrompt, "\n" + err);
            }
        }

        automationFunction();
    }

    // // // Add automation if applicable
    // if(currPrompt === prompts.StoneAge2 && numAutomation === 0) {
    //     addAutomationTab(1);
    //     numAutomation += 1;
    //
    // } else if (currPrompt === prompts.StoneAge3 && numAutomation === 1) {
    //     addAutomationTab(2);
    //     numAutomation += 1;
    // }
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

    // For now, only when enter is pressed
    //if(event.key === "Enter") {

    //let commandObject = parseCommandString(inputString);

    with(FunctionManager.getInstance()){

        //console.log(inputString);

        // Special case for automation
        if(inputString.includes("automate") && !isAutomationFull && isGameStarted){
            isAutomation = true;
            parseAutomation(inputString.substring(1), commandPrompt);
        } else if(isAutomation && !isAutomationFull && isGameStarted){
            parseAutomation(inputString, commandPrompt);
        } else if(isAutomationFull && isGameStarted) {
            appendText(commandPrompt, "\n\n// Sorry! You have used up all of your automated functions!\n\n>");
        }
        else{
            try{
                eval(inputString.substring(1));
            }
            catch(err) {
                appendText(commandPrompt, "\n" + err + "\n\n>");
            }
        }
    }
    updatePreviewVisualizer(commandPrompt);
}



//list of choices in an age
let ageChoices = [];
let ageList = [];

// Function for switching to next prompt
function getNextPrompt() {
    //change prompt regular stuff
    let nextPrompt = currPrompt.NextPrompt;
    currPrompt = prompts[nextPrompt];


    //getting info for firebase
    if((currPrompt === prompts.MetalAge1) || (currPrompt === prompts.ConqueringAge1)  || (currPrompt === prompts.IndustrialAge1) || (currPrompt === prompts.SpaceAge1) || (currPrompt === prompts.finish)){
        //if start of new age, push age choices and empty list
        //TODO: need to gather the data for at the end of the game
        ageList.push(getStatsPerAge(ageChoices));
        ageChoices = [];
    }
    if(currPrompt === prompts.finish){
        console.log("data pushed to database");
        writeResults();
        redirect();
    }
    else{
        ageChoices.push(getStatsPerChocie());
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

    console.log(beginningBraceCount);
    console.log(endingBraceCount);
    console.log(beginningParCount);
    console.log(endingParCount);

    // If valid automation, execute
    if(beginningBraceCount !== 0 && endingBraceCount !== 0 && beginningBraceCount === endingBraceCount &&
        beginningParCount !== 0 && endingParCount !== 0 && beginningParCount === endingParCount) {
        isAutomation = false;
        console.log(codeString);
        try{
            with(FunctionManager.getInstance()) {
                isAutomationFull = true;
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

// Add automation block
// function addAutomationTab(index) {
//
//     switch(index) {
//         case 1:
//             document.getElementById('automation1Tab').style.display = 'inline-block';
//             break;
//         case 2:
//             document.getElementById('automation2Tab').style.display = 'inline-block';
//             break;
//     }
// }

// // Function for opening a tab to display CodeMirror widget
// function openTab(event, tabName) {
//     let i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//
//     switch(tabName) {
//         case 'commandPrompt':
//             commandPrompt.getWrapperElement().style.display = "block";
//             automation1.getWrapperElement().style.display = "none";
//             automation2.getWrapperElement().style.display = "none";
//             document.getElementById('references').style.display = "none";
//             break;
//         case 'automation1':
//             commandPrompt.getWrapperElement().style.display = "none";
//             automation1.getWrapperElement().style.display = "block";
//             automation2.getWrapperElement().style.display = "none";
//             document.getElementById('references').style.display = "none";
//             break;
//         case 'automation2':
//             commandPrompt.getWrapperElement().style.display = "none";
//             automation1.getWrapperElement().style.display = "none";
//             automation2.getWrapperElement().style.display = "block";
//             document.getElementById('references').style.display = "none";
//             break;
//         case 'references':
//             commandPrompt.getWrapperElement().style.display = "none";
//             automation1.getWrapperElement().style.display = "none";
//             automation2.getWrapperElement().style.display = "none";
//             document.getElementById('references').style.display = "block";
//     }
// }


//firebase things to store
function getStatsPerChocie(){
    let currentStats = [];
    let DataStr = DataManager.getInstance().getDataList();
    let currHunger = DataStr["Hunger"].getValue() / DataStr["Hunger"].getMax() ;
    let currSecure = DataStr["Security"].getValue() / DataStr["Security"].getMax();
    let currPop = DataStr["Population"].getValue() / DataStr["Population"].getMax();
    let currMil = DataStr["Military"].getValue() / DataStr["Military"].getMax() ;
    let currSci = DataStr["Science"].getValue() / DataStr["Science"].getMax() ;
    currentStats.push(currHunger,currSecure,currPop,currMil,currSci);
    return currentStats;
}
function getStatsPerAge(listOfChoiceStats){
    let currentAgeStats = [];
    //TODO:// get a timer thang
    let currAgeTime = 120; //in seconds
    currentAgeStats.push(currAgeTime,listOfChoiceStats);
    return currentAgeStats;
}

function writeResults(){
    thingToWrite = new dbWriter();
    thingToWrite.writePerSession(ageList);
    //redirect to survey
    window.location.href = thingToWrite.redirect();

}

// Randomly select choice
function makeRandomChoice() {
    appendText(commandPrompt, "\n// Our AI has picked a wise decision for you automatically.");
    let fm = FunctionManager.getInstance();
    fm.setNumChoices(fm.getNumChoices() - 1);
    if(Math.random() > 0.5){
        fm.choose(2);
    }
    else{
        fm.choose(1);
    }
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
                randChoiceChance = 0.00000001;
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
