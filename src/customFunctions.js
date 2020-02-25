let FunctionManager = (function () {
    let instance;

    function createInstance() {
        let dm = DataManager.getInstance();

        let manual = {
            "secure": "// Usage: secure(). Increase security by a level, when possible. The max security is level 5.",
            "eat": "// Usage: eat(). Decrease food by 1, but also increase hunger by a small amount.",
            "choose": "// Usage: choose(id), Make a choice from the list of choice given.",
            "man": "// Usage: man(command). Check the command's usage and description.",
            "legend": "// Usage: legend(). Look at the legend for the bar visual, with color coding for each statistic."
        };

        let _secure = function(){
            if (dm.getValue("Security").getValue() < 5) {
                dm.addToValue("Security", 1);
            }
        };

        let _eat = function(){
            if(dm.getValue("Food").getValue() > 0) {
                dm.subtractFromValue("Food", 1);
                dm.addToValue("Hunger", 5);
            }
        };

        let _choose = function(val){
            changeStats(currPrompt.Choice[val - 1]);
            addResult(currPrompt.Choice[val - 1].Result);
            getNextPrompt();
            dm.checkGameStatus();
            DataManager.getInstance().pauseTimer();
            setTimeout(function() {
                addPrompt(currPrompt.Prompt);
                updatePreviewVisualizer(commandPrompt);
                //reset timer
                DataManager.getInstance().resetTimer();
            }, 2000);
        };

        let _setCharAt = function setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        };

        let _automate = function(fun){
            fun();
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