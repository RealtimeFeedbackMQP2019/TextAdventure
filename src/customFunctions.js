const manual = {
    "secure": "// Usage: secure(). Increase security by a level, when possible. The max security is level 5.\n",
    "eat": "// Usage: eat(). Decrease food by 1, but also increase hunger by a small amount.\n",
    "choose": "// Usage: choose(id), Make a choice from the list of choice given.\n",
    "man":"// Usage: man(command). Check the command's usage and description.\n",
    "legend": "// Usage: legend(). Look at the legend for the bar visual, with color coding for each statistic.\n",
    "automate": "// Usage: automate(function(){}) Automate an anonymous function to run with each game update, if the conditions are met."
};

let FunctionManager = (function () {
    let instance;

    function createInstance() {
        let dm = DataManager.getInstance();
        let promptCount = 0;



        let numChoices = 0;
        let numTimesCanSecure = 0;

        let _secure = function(){
            if (dm.getValue("Security").getValue() < 5 && numTimesCanSecure > 0) {
                dm.addToValue("Security", 1);
                numTimesCanSecure -= 1;
            }
        };

        let _eat = function(){
            if(dm.getValue("Food").getValue() > 0) {
                dm.subtractFromValue("Food", 1);
                dm.addToValue("Hunger", 5);
            }
        };

        let _choose = function(val){
            clearInterval(securityTickUpdate);
            createVisualizer(commandPrompt, drawSnapshot(commandPrompt.defaultTextHeight()));
            changeStats(currPrompt.Choice[val - 1]);
            DataManager.getInstance().addPromptDataHistory();

            addResult(currPrompt.Choice[val - 1].Result);

            // Add to choices counter and check for security
            if(dm.getValue("Security").getValue() < 5) {
                numChoices += 1;
            }

            if(numChoices % 3 === 0) {
                appendText(commandPrompt, "// You can now upgrade your security another level!\n\n");
                numTimesCanSecure += 1;
            }

            getNextPrompt();
            if(!introduceAuto) {
                FunctionManager.getInstance().finishChooseCommand();
            }
        };

        let _setCharAt = function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        };

        // Used to store automation functions
        let automationFunctions = {
            "0": function(){},
            "1": function(){},
            "2": function(){},
            "3": function(){},
        };

        // Index of currently-evaluated automation function
        let currAutoIndex = -1;

        let _automate = function(fun){
            automationFunctions[currAutoIndex] = fun;
        };

        return{
            getValue(key){
                return DataManager.getInstance().getValue(key).getValue();
            },
            testFunction(){
                return "TESTING!!!";
            },
            getTime(){
                return DataManager.getInstance().getTimer.getTime()
            },
            secure(){
                _secure();
            },
            eat(){
                _eat();
            },
            choose(val){
                _choose(val);
            },
            man(funName){
                manCount +=1;
                if(!funName) {
                    appendText(commandPrompt, "\n\n" + JSON.stringify(manual) + "\n\n>");
                } else {
                    let str = funName.name;
                    // Check if automation introduced, and do nothing if not
                    if(!autoIntroduced && str.includes("automate")){
                        appendText(commandPrompt, "\n>");
                    } else {
                        appendText(commandPrompt, "\n\n" + manual[str] + "\n\n>");
                    }
                }
            },
            thanos(){
                let lines = "";
                for(let i = 0; i < commandPrompt.lineCount(); i++){
                    //if(Math.random() > 0.5){
                    let temp = commandPrompt.getLine(i);
                    let newline = "";

                    //lines += commandPrompt.getLine(i) + "\n";
                    for(let j = 0; j < temp.length; j++){
                        if(Math.random() > 0.5 && temp.charAt(j) !== " "){
                            newline += temp.charAt(j);
                        }
                        else{
                            newline += " ";
                        }
                    }
                    lines += newline + "\n";

                    //}
                }
                commandPrompt.setValue(lines);
            },
            legend(){
                appendText(commandPrompt, "\n\n// HUNGER: orange\n// FOOD: red\n// SECURITY: blue\n// POPULATION: green\n// MILITARY: pink\n// SCIENCE: purple\n\n>")
            },
            automate(fun){
                _automate(fun);
            },
            getAutomationFunctions(){
                return automationFunctions;
            },
            setAutomationFunction(key, value) {
                automationFunctions[key] = value;
            },
            getNumChoices(){
                return numChoices;
            },
            setNumChoices(num){
                numChoices = num;
            },
            getCurrAutoIndex(){
                return currAutoIndex;
            },
            setCurrAutoIndex(index){
                currAutoIndex = index;
            },
            finishChooseCommand(){
                dm = DataManager.getInstance();
                dm.checkGameStatus();
                dm.pauseTimer();
                setTimeout(function () {
                    addPrompt(currPrompt.Prompt);
                    updatePreviewVisualizer(commandPrompt);
                    //reset timer
                    dm.resetTimer();
                    // Reset then pause auto timer
                    dm.resetAutoTimer();
                    dm.pauseAutoTimer();
                }, 2000);

                promptCount += 1;

                // Reset start time
                let d = new Date();
                startTime = d.getTime();

                // Reset security and main game intervals
                gameTickUpdate = setInterval('update()', gameTickInterval);
                securityTickUpdate = setInterval('securityIssue()', securityTickInterval);
            }
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
