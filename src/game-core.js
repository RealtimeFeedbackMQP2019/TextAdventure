// game-core.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
//let commandPrompt;

// Timer to update game - called with each tick
let gameTickUpdate;
let securityTickUpdate;

// Keep track of current prompt
let currPrompt;
let commandPrompt;
let automation1;
let automation2;

// Keep track of adding automation
//let numAutomation = 0;

// Keeping track of whether automation has begun or not
let isAutomation;
let automationCode = [];

let previewCanvas;

let LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

let tv;

// Initialize commandPrompt and game ticks
function init(){

    //initVariables();

    //visInit();

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
    commandPrompt.on("change", function (cm, event) {
        //Set the content of the line into...
        let line = commandPrompt.getLine(commandPrompt.getCursor().line);
        prematchCommand(line);
        updatePreviewVisualizer(cm);

    });

    window.addEventListener("onscroll", function(){
        updatePreviewVisualizer(cm);
    });

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
    commandPrompt.getWrapperElement().style.display = "block";
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
    FunctionManager.getInstance().getAutomationFunction()();

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
            if(inputString.includes("automate")){
                isAutomation = true;
                parseAutomation(inputString.substring(1));
            } else if(isAutomation){
                parseAutomation(inputString);
            } else{
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
}

// Function for adding prompt result text
function addResult(choice) {
    appendText(commandPrompt,"\n\n" + choice);
}

// Parsing the automation blocks
function parseAutomation(inputString) {

    automationCode.push(inputString);
    console.log(automationCode);

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
                eval(codeString);
            }
        }
        catch(err) {
            appendText(commandPrompt, "\n" + err);
        }
        appendText(commandPrompt, "\n\n>");
        automationCode = [];
    }  else {
        commandPrompt.replaceSelection("\n", "end");
    }

}

// Add automation block
function addAutomationTab(index) {

    switch(index) {
        case 1:
            document.getElementById('automation1Tab').style.display = 'inline-block';
            break;
        case 2:
            document.getElementById('automation2Tab').style.display = 'inline-block';
            break;
    }
}

// Function for opening a tab to display CodeMirror widget
function openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    switch(tabName) {
        case 'commandPrompt':
            commandPrompt.getWrapperElement().style.display = "block";
            automation1.getWrapperElement().style.display = "none";
            automation2.getWrapperElement().style.display = "none";
            document.getElementById('references').style.display = "none";
            break;
        case 'automation1':
            commandPrompt.getWrapperElement().style.display = "none";
            automation1.getWrapperElement().style.display = "block";
            automation2.getWrapperElement().style.display = "none";
            document.getElementById('references').style.display = "none";
            break;
        case 'automation2':
            commandPrompt.getWrapperElement().style.display = "none";
            automation1.getWrapperElement().style.display = "none";
            automation2.getWrapperElement().style.display = "block";
            document.getElementById('references').style.display = "none";
            break;
        case 'references':
            commandPrompt.getWrapperElement().style.display = "none";
            automation1.getWrapperElement().style.display = "none";
            automation2.getWrapperElement().style.display = "none";
            document.getElementById('references').style.display = "block";
    }
}


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

    if(dm.getTimer()._currentTime > 0 && !dm.getGameStatus()) {

        console.log("You getting called bruh?");

        // Random chance of making random decision whenever
        let securityLevel = datalist.Security.getValue();
        let randChoiceChance;

        switch (securityLevel) {
            case 1:
                randChoiceChance = 0.5;
                break;
            case 2:
                randChoiceChance = 0.33;
                break;
            case 3:
                randChoiceChance = 0.25;
                break;
            case 4:
                randChoiceChance = 0.1;
                break;
            case 5:
                randChoiceChance = 0.01;
                break;
        }

        let randNum = Math.random();
        if (randNum > randChoiceChance) {
            console.log("TIME TO DELIVER A PIZZA BALL!");
            makeRandomChoice();
            dm.resetTimer();
        }
    }
}
