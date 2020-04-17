

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
            console.log("HIIII!");
            clearInterval(securityTickUpdate);
            createVisualizer(commandPrompt, drawSnapshot(commandPrompt.defaultTextHeight()));
            changeStats(currPrompt.Choice[val - 1]);
            DataManager.getInstance().addPromptDataHistory();

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

            promptCount += 1;

            // Reset start time
            let d = new Date();
            startTime = d.getTime();

            // Reset security and main game intervals
            gameTickUpdate = setInterval('update()', gameTickInterval);
            securityTickUpdate = setInterval('securityIssue()', securityTickInterval);
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

        let _automate = function(fun){
            automationFunctions[currNumAutomation-1] = fun;
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
