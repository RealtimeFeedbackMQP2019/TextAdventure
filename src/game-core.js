// game-core.js - sandbox for testing core functionality of text-based simulation

// Code Mirror - command prompt functionality
//let commandPrompt;

// Timer to update game - called with each tick
let gameTickUpdate;

// Keep track of current prompt
let currPrompt;
let commandPrompt;
let automation1;
let automation2;

// Keep track of adding automation
let numAutomation = 0;

let previewCanvas;

// Manual for to tell user what functions can access
let manual = "\n\n// You have access to the following functions:\n\n" +
    "// choose(choice); - make a choice in response to the given prompt, with the choice parameter being the number of the decision to make\n" +
    "// eat() - eat 1 piece of food, decreases food remaining by 1 and increases Hunger by 5\n" +
    "// secure() - raise the Security statistic by 1, when permitted to\n" +
    "// automate(code) - automatically executes the code specified as a code block and continues to execute until the automate() call is removed\n" +
    "// legend() - brings up the legend for the bar chart visualization to match each bar to a statistics\n" +
    "// man() - display this manual again\n\n";

let LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

// Initialize commandPrompt and game ticks
function init(){

    //initVariables();
    //visInit();

    commandPrompt = CodeMirror.fromTextArea(document.getElementById("commandPrompt"),{
        lineNumbers : true,
        lineWrapping: true,
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
    commandPrompt.on("keydown", function (cm, event) {
        updatePreviewVisualizer(cm);
    });



    automation1 = CodeMirror.fromTextArea(document.getElementById("automation1"),{
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
    automation2.setSize('100%', '100%');

    // Only set main console visible
    commandPrompt.getWrapperElement().style.display = "block";
    automation1.getWrapperElement().style.display = "none";
    automation2.getWrapperElement().style.display = "none";
    document.getElementById('references').style.display = "none";

    // Hide automation tabs as well
    document.getElementById("automation1Tab").style.display = "none";
    document.getElementById("automation2Tab").style.display = "none";

    gameTickUpdate = setInterval('update()', 1000);

    // Set current prompt to Stone Age 1
    currPrompt = prompts.StoneAge1;

    // Display first prompt
    addPrompt(prompts.StoneAge1.Prompt);

    // Initialize legend to be hidden
    document.getElementById("legend").style.display = "none";
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

    // // Add automation if applicable
    if(currPrompt === prompts.StoneAge2 && numAutomation === 0) {
        addAutomationTab(1);
        numAutomation += 1;

    } else if (currPrompt === prompts.StoneAge3 && numAutomation === 1) {
        addAutomationTab(2);
        numAutomation += 1;
    }
}


const keywords = ["eat", "raiseSecurity", "choose"];
const functions = {
    "":function(){
        drawFunction = renderPreview;
        param = {};
    },
    "eat": function(){
        drawFunction = renderPreview;
        param = {"Hunger":5};
    },
    "raiseSecurity": function () {
        drawFunction = renderPreview;
        param = {"Security":1};
    },
    "choose": function () {
        //don't do anything yet..
    }
};

function prematchCommand(inputString){
    console.log(inputString);
    if(inputString === ""){
        functions[""]();
        return;
    }

    let lbpos = inputString.indexOf("(");
    if(lbpos !== -1){
        //We have found less information than given
        let command = inputString.substring(0, lbpos);
        for(var keyword of keywords){
            if(keyword === command){
                //Found a match for the command, call function..
                functions[keyword]();
            }

        }
    }
    else{

        for(var keyword of keywords){
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
            try{
                eval(inputString.substring(1));
            }
            catch(err) {
                appendText(commandPrompt, "\n" + err + "\n\n>");
            }
        }

        /*
        let actual = commandObject.act;
        let arguments = commandObject.arg;

        let DataStr = DataManager.getInstance().getDataList();
        let dm = DataManager.getInstance();

        // Break the command into the command body and argument.
        switch (actual) {
            // Eat() command
            case "eat":
                if(DataStr["Food"].getValue() > 0) {
                    dm.subtractFromValue("Food", 1);
                    dm.addToValue("Hunger", 5);
                }
                break;

            // RaiseSecurity() command
            case "secure":
                if (DataStr["Security"].getValue() < 5) {
                    dm.addToValue("Security", 1);
                }
                break;

            // Snapshot() command
            case "snapshot":
                createVisualizer(commandPrompt);
                break;

            // Choose() command with parameters
            case "choose":
                console.log(arguments);
                console.log(typeof arguments);

                let choiceOption = 0;
                try {
                    choiceOption = parseInt(arguments.shift());
                }
                catch(e) {

                }
                changeStats(currPrompt.Choice[choiceOption - 1]);
                addResult(currPrompt.Choice[choiceOption - 1].Result);
                getNextPrompt();
                DataManager.getInstance().checkGameStatus();

                addPrompt(currPrompt.Prompt);
                break;

            // Automate() command with parameters
            case "automate":
                // Do something for automation woo
                break;

            // Manual for references
            case "man":
                appendText(commandPrompt, manual + ">");
                break;

            // Legend for bars
            case "legend":
                displayLegend();
                break;
        }*/
        
    //}
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
    if(currPrompt == prompts.MetalAge1 || prompts.ConqueringAge1  || prompts.IndustrialAge1 || prompts.SpaceAge1 || prompts.finish){
        //if start of new age, push age choices and empty list
        //TODO: need to gather the data for at the end of the game
        ageList.push(getStatsPerAge(ageChoices));
        ageChoices = [];
    }
    if(currPrompt == prompts.finish){
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
        lineStr + text,
        { line:lineNumber, ch:0 },
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

function parseCommandString(inputString){
    let line = inputString.substr(inputString.lastIndexOf(">"));
    // line = inputString;
    let command = line.substr(1);
    // Get last line of text area

    console.log(command);
    //let command = commandPrompt.getValue();
    let actual = command.toLowerCase();
    let lbpos = command.indexOf("(");
    let argString = actual.substr(lbpos + 1, actual.length - lbpos - 2);

    // Actual command name
    actual = actual.substr(0, lbpos);

    // Arguments of choose() command
    let arguments = argString.split(/\s*,{1}\s*/);
    return {"act":actual, "arg":arguments};
}

// Parsing the automation blocks
function parseAutomation(code) {

    // Counters for curly braces
    let beginningBraceCount = 0;
    let endingBraceCount = 0;

    // String to store code as
    let codeString = "";

    // Iterate through lines
    for(let i = 0; i < code.length; i++) {

        // If curly braces, add to count
        if(code[i].includes('{')) {
            beginningBraceCount += 1;
        }
        if(code[i].includes('}')) {
            endingBraceCount += 1;
        }

        // Add to string
        codeString += code[i];
    }

    // If valid automation, execute
    if(beginningBraceCount !== 0 && endingBraceCount !== 0 && beginningBraceCount === endingBraceCount) {
        console.log(codeString);
        eval(codeString);
    } else {
        automation1.replaceSelection("\n", "end");
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

// Function for displaying legend
function displayLegend() {
    appendText(commandPrompt, "\n\n" + "wooo legend" + "\n\n>");
    // appendText(commandPrompt, "\n\n" + document.getElementById("hungerLegend").innerText + "\n");
    //     // appendText(commandPrompt, document.getElementById("foodLegend").innerHTML + "\n");
    //     // appendText(commandPrompt, document.getElementById("securityLegend").innerHTML + "\n");
    //     // appendText(commandPrompt, document.getElementById("populationLegend").innerHTML + "\n");
    //     // appendText(commandPrompt, document.getElementById("militaryLegend").innerHTML + "\n");
    //     // appendText(commandPrompt, document.getElementById("scienceLegend").innerHTML + "\n\n>");
}



//firebase things to store
function getStatsPerChocie(){
    let currentStats = [];
    let DataStr = DataManager.getInstance().getDataList();
    let currHunger = DataStr["Hunger"].getValue();
    let currSecure = DataStr["Security"].getValue();
    let currPop = DataStr["Population"].getValue();
    let currMil = DataStr["Military"].getValue();
    let currSci = DataStr["Science"].getValue();
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
