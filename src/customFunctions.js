const manual = {
    "secure": "// Usage: secure(). Increase security by a level, when possible. The max security is level 5.\n",
    "eat": "// Usage: eat(). Decrease food by 1, but also increase hunger by a small amount.\n",
    "choose": "// Usage: choose(id) or option(id), Make a choice from the list of choice given.\n",
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
            console.log("WE IN CHOOSE1");
            // While introducing automation (next prompt is MetalAge1), stop from executing
            if(currPrompt.NextPrompt === "MetalAge1" && maxAutomation === 0) {
                introduceAuto = true;
                maxAutomation += 1;
                pauseChooseVal = val;
                introduceAutomation();
            } else if(!introduceAuto) {
                createVisualizer(commandPrompt, drawSnapshot(commandPrompt.defaultTextHeight()));
                changeStats(currPrompt.Choice[val - 1]);
                DataManager.getInstance().addPromptDataHistory();

                addResult(currPrompt.Choice[val - 1].Result);

                // Add to choices counter and check for security
                if(dm.getValue("Security").getValue() < 5) {
                    numChoices += 1;
                    if(numChoices % 3 === 0) {
                        appendText(commandPrompt, "// You can now upgrade your security another level!\n", "color: #478ee6");
                        appendText(commandPrompt, "// Keep it high so there's a smaller chance of random decisions made!\n\n", "color: #478ee6");
                        numTimesCanSecure += 1;
                    }
                }

                // if(numChoices % 3 === 0 && !(dm.getValue("Security") === 5)) {
                //     appendText(commandPrompt, "// You can now upgrade your security another level!\n", "color: #478ee6");
                //     appendText(commandPrompt, "// Keep it high so there's a smaller chance of random decisions made!\n\n", "color: #478ee6");
                //     numTimesCanSecure += 1;
                // }

                getNextPrompt();
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
            console.log(automationFunctions[currAutoIndex]);
        };


        let _appendIcon = function(key){
            let image = document.createElement('img');
            image.src = DataManager.getInstance().getValue(key).getIcon().src;
            image.width = commandPrompt.defaultTextHeight() / 11 * 14;
            image.height = commandPrompt.defaultTextHeight();
            return image;
        };

        return{
            getValue(key){
                return DataManager.getInstance().getValue(key).getValue();
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
            chose(val){
                _choose(val);
            },
            option(val){
                _choose(val);
            },
            man(funName){
                manCount +=1;
                if(!funName) {
                    appendText(commandPrompt, "\n\n// secure(): Increase ");
                    appendText(commandPrompt, "security ", "color:" + DataManager.getInstance().getValue("Security").getColor());
                    appendWidget(_appendIcon("Security"));
                    appendText(commandPrompt, " by a level. The max security is level 5.");

                    appendText(commandPrompt, "\n\n// eat(): Decrease ");
                    appendText(commandPrompt, "food ", "color:" + DataManager.getInstance().getValue("Food").getColor());
                    appendWidget(_appendIcon("Food"));
                    appendText(commandPrompt, " by 1, but also increase ");
                    appendText(commandPrompt, "hunger ", "color:" + DataManager.getInstance().getValue("Hunger").getColor());
                    appendWidget(_appendIcon("Hunger"));
                    appendText(commandPrompt, " by a small amount.");
                    appendText(commandPrompt, "\n\n// choose(id): " + manual.choose + "\n// man(): " + manual.man + "\n// legend(): " + manual.legend);
                    if(autoIntroduced){
                        appendText(commandPrompt, "\n\n// automate(): " + manual.automate + "\n\n>");
                    }
                    else{
                        appendText(commandPrompt, "\n\n>");
                    }
                } else {
                    let str = funName.name;
                    // Check if automation introduced, and do nothing if not
                    if(!autoIntroduced && str.includes("automate")){
                        appendText(commandPrompt, "\n>");
                    } else {
                        if(str == "option"){
                            appendText(commandPrompt, "\n\n" + manual.choose + "\n\n>");
                        }
                        else {
                            appendText(commandPrompt, "\n\n" + manual[str] + "\n\n>");
                        }

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

                for(let x of LIST_OF_VALS){
                    appendText(commandPrompt, "\n//" + x + ": ", "color:" + DataManager.getInstance().getValue(x).getColor());
                    appendWidget(_appendIcon(x));
                }
                appendText(commandPrompt, "\n\n>");


                //appendText(commandPrompt, "\n\n// HUNGER: red\n// FOOD: orange\n// SECURITY: blue\n// POPULATION: green\n// MILITARY: pink\n// SCIENCE: purple\n\n>")
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
            // finishChooseCommand(){
            //     dm = DataManager.getInstance();
            //     dm.checkGameStatus();
            //     dm.pauseTimer();
            //     setTimeout(function () {
            //         addPrompt(currPrompt.Prompt);
            //         updatePreviewVisualizer(commandPrompt);
            //         //reset timer
            //         dm.resetTimer();
            //         // Reset then pause auto timer
            //         dm.resetAutoTimer();
            //         dm.pauseAutoTimer();
            //     }, 2000);
            //
            //     promptCount += 1;
            //
            //     // Reset start time
            //     let d = new Date();
            //     startTime = d.getTime();
            //
            //     // Reset security and main game intervals
            //     gameTickUpdate = setInterval('update()', gameTickInterval);
            //     securityTickUpdate = setInterval('securityIssue()', securityTickInterval);
            // }
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
