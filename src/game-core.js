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
            let line = automation1.getLine(automation1.lastLine());
            matchCommand(line);
            //commandPrompt.setValue(commandPrompt.getValue() + "\n\n>");

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
            let line = automation2.getLine(automation2.lastLine());
            matchCommand(line);
            //commandPrompt.setValue(commandPrompt.getValue() + "\n\n>");

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
    //document.getElementById("prompt").innerHTML = prompts.StoneAge1.Prompt;
    addPrompt(prompts.StoneAge1.Prompt);

    //FIREBASE
    firebaseDoSomething()
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
        subtractFromValue("Hunger", 1);
        subtractFromValue("Population", 2);
        subtractFromValue("Military", 5);
        subtractFromValue("Science", 5);
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
    if(event.key === "Enter") {

        let commandObject = parseCommandString(inputString);
        let actual = commandObject.act;
        let arguments = commandObject.arg;

        let DataStr = DataManager.getInstance().getDataList();


        // Break the command into the command body and argument.
        switch (actual) {
            // Eat() command
            case "eat":
                if(DataStr["Food"].getValue() > 0) {
                    subtractFromValue("Food", 1);
                    addToValue("Hunger", 5);
                }
                break;

            // RaiseSecurity() command
            case "secure":
                if (DataStr["Security"].getValue() < 5) {
                    addToValue("Security", 1);
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
        }
        
    }
}

// Function for switching to next prompt
function getNextPrompt() {
    let nextPrompt = currPrompt.NextPrompt;
    currPrompt = prompts[nextPrompt];
}

// Function for changing values base on choice
function changeStats(choice) {
    addToValue("Food", choice.Food);
    addToValue("Security", choice.Security);
    addToValue("Population", choice.Population);
    addToValue("Military", choice.Military);
    addToValue("Science",choice.Science);
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

    cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lineCount() - 1).length);
}

// Function for adding prompt result text
function addResult(choice) {
    appendText(commandPrompt,"\n" + choice);
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

    // let automation = document.createElement("TEXTAREA");
    // automation.id = "automation" + index.toString();
    // automation.style.display = "inline-block";
    //
    // document.getElementById("automation").insertAdjacentElement('afterbegin', automation);

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

function firebaseDoSomething(){
    //actual player shit here
    var ref = firebase.database().ref('players');

    console.log(ref);

    //something is wrong here??
    var playersRef = ref.child("player-stats");
    playersRef.push ({
        food: 10,
        military: 1,
        population: 30,
        science: 10,
        security: 5
    });
    var playersKey = playersRef.key();
    console.log(playersKey);
}