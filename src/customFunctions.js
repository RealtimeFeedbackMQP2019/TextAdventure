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

        let _overview = function(){
            appendText(commandPrompt, "This is your performance over the last few prompts: ");
            createVisualizer(commandPrompt,  drawOverview(LIST_OF_VALS, commandPrompt.defaultTextHeight()));
        };

        let _choose = function(val){
            console.log("HIIII!");
            clearInterval(securityTickUpdate);
            createVisualizer(commandPrompt, drawSnapshot(commandPrompt.defaultTextHeight()));
            changeStats(currPrompt.Choice[val - 1]);
            DataManager.getInstance().addPromptDataHistory();

            if(promptCount %5 === 0 && promptCount !== 0){
                _overview();
            }

            addResult(currPrompt.Choice[val - 1].Result);
            getNextPrompt();

            // Add to choices counter and check for security
            if(dm.getValue("Security").getValue() < 5) {
                numChoices += 1;
            }

            if(numChoices % 3 === 0) {
                appendText(commandPrompt, "// You can now upgrade your security another level!\n\n");
                numTimesCanSecure += 1;
            }

            dm.checkGameStatus();
            DataManager.getInstance().pauseTimer();
            setTimeout(function() {
                addPrompt(currPrompt.Prompt);
                updatePreviewVisualizer(commandPrompt);
                //reset timer
                DataManager.getInstance().resetTimer();
                // Reset then pause auto timer
                DataManager.getInstance().resetAutoTimer();
                DataManager.getInstance().pauseAutoTimer();
            }, 2000);
            securityTickUpdate = setInterval('securityIssue()', 15000);

            promptCount += 1;
            isAutomationFull = false;
        };

        let _setCharAt = function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        };

        let automationFunction = function(){
            //Do nothing right now
        };

        let _automate = function(fun){
            automationFunction = fun;
        };

        return{
            getValue(key){
                console.log(DataManager.getInstance().getValue(key).getValue());

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
                    appendText(commandPrompt, "\n\n" + manual[str] + "\n\n>");
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
            // next(){
            //     _next();
            // },
            getAutomationFunction(){
                return automationFunction;
            },
            getNumChoices(){
                return numChoices;
            },
            setNumChoices(num){
                numChoices = num;
            },
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
