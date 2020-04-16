let DataManager = (function () {
    let instance;

    function createInstance() {
        //Initialize things here.
        let DataList = {
            "Hunger": new ValueData("Hunger", 30, 40, "#e64747", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_hunger.png"),
            "Food": new ValueData("Food", 5, 20, "#e69647", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_food.png"),
            "Security": new ValueData("Security", 3, 5, "#478ee6", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_security.png"),
            "Population": new ValueData("Population", 200, 1000, "#b0e647", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_population.png"),
            "Military": new ValueData("Military", 100, 100, "#e64796", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_military.png"),
            "Science": new ValueData("Science", 50, 50, "#a547e6", "https://realtimefeedbackmqp2019.github.io/TextAdventure/Icons/ico_science.png")
        };

        // Decrease rates
        let DecreaseRates = {
            "Hunger": 1,
            "Population": 2,
            "Military": 3,
            "Science": 3
        };

        // Copy of previous decrease rates before pausing
        let PrevDecreaseRates = {};

        let PromptDataHistory = [];

        // Main timer
        let timer = new TimerVisualizer(document.getElementById("timer"),45);

        // Automation timer
        let autoTimer = new TimerVisualizer(document.getElementById("autoTimer"),120);

        // Set timers
        if(isGameStarted) {
            setInterval(function(){
                timer.decreaseTime();
            }, 100);
            visUpdate(timer);

            setInterval(function(){
                autoTimer.decreaseTime();
            }, 100);
            visUpdate(autoTimer);
        }

        let previewValues = {};

        return{
            addToValue(key, value){
                let dEntry = DataList[key];
                //if value <0, set value = 0
                if(dEntry !== null && dEntry.getValue() + value < 0){
                    dEntry.setValue(0);
                }
                else{
                    dEntry.addValue(value);
                }
                EventDispatcher.getInstance().fireEvent(new GameEvent(
                    "valueChangeEvent",
                    {stat:key, value:value}
                    ));
                this.updateDisplayVariables();
                this.checkGameStatus();
            },

            subtractFromValue(key, value){
                //if value is <0, no worries, refer to addToValue
                this.addToValue(key, -value);
            },

            getValue(key){
                return DataList[key];
            },

            checkGameStatus(){
                // Check for game loss condition
                if(DataList["Hunger"].getValue() <= 0){
                    clearInterval(gameTickUpdate);
                    clearInterval(securityTickUpdate);
                    appendText(commandPrompt, "// Oh, you're not looking so good, guess we're stuck here forever...GAME OVER");
                    this.pauseTimer();
                    //console.log("hello in thereaaaaaaaaaaaaaaaaa");
                    //write to firebase - get current age stats even if age isnt over
                    ageList.push(ageChoices);
                    //sleep(14000);
                    setTimeout(writeResults, 5000);
                    //document.getElementById("gameOver").style.display = "inline";
                    // Somehow disable commands from being entered
                    //document.getElementById("textEditorBox").style.pointerEvents = "none";
                }

                // Check for game win condition
                if(currPrompt === "finish") {
                    clearInterval(gameTickUpdate);
                    clearInterval(securityTickUpdate);
                    this.pauseTimer();
                    appendText(commandPrompt, "// Yay, you did it! We can go back home to our normal time! Great job!");
                    //write to firebase - get current age stats even if age isnt over
                    ageList.push(ageChoices);
                    //sleep(14000);
                    setTimeout(writeResults, 5000);
                    //document.getElementById("gameOver").style.display = "inline";
                    //write to firebase happens in gamecore
                }
            },

            updateDisplayVariables(){
                // for(let key in DataList){
                //     document.getElementById(key).innerHTML = DataList[key].getValue();
                // }
            },

            getDataList(){
                return DataList;
            },

            getDecreaseRates(){
                return DecreaseRates;
            },

            setDecreaseRates(keys, values){
                for(let i = 0; i < keys.length; i++) {
                    DecreaseRates[keys[i]] = values[i];
                }
            },

            assignDecreaseRate(decRates){
                DecreaseRates = Object.assign({}, decRates);
            },

            getPrevDecreaseRates(){
                return PrevDecreaseRates;
            },

            setPrevDecreaseRates(decRates){
                PrevDecreaseRates = Object.assign({}, decRates);
            },

            resetTimer(){
                DataManager.getInstance().assignDecreaseRate(DataManager.getInstance().getPrevDecreaseRates());
                timer.reset();
            },

            pauseTimer(){
                DataManager.getInstance().setPrevDecreaseRates(DataManager.getInstance().getDecreaseRates());
                DataManager.getInstance().setDecreaseRates(["Hunger", "Population", "Military", "Science"], [0, 0, 0, 0]);

                // Pause security and main game ticks
                let currDate = new Date();
                securityTickRemaining = securityTickInterval - (currDate.getTime() - startTime);
                clearInterval(gameTickUpdate);
                clearInterval(securityTickUpdate);
                timer.pause();
            },

            resumeTimer(){
                DataManager.getInstance().assignDecreaseRate(DataManager.getInstance().getPrevDecreaseRates());

                // Resume both main game and security intervals
                gameTickUpdate = setInterval('update()', gameTickInterval);
                setTimeout('securityIssue()', securityTickRemaining);
                timer.resume();
            },

            resetAutoTimer(){
                autoTimer.reset();
            },

            pauseAutoTimer(){
                autoTimer.pause();
            },

            resumeAutoTimer(){
                autoTimer.resume();
            },

            getTimer(){
                return timer;
            },

            getAutoTimer(){
                return autoTimer;
            },

            setPreviewValues(pv){
                previewValues = pv;
            },

            getPreviewValues(){
                return previewValues;
            },

            addPromptDataHistory(){
                //Adds in the current values:
                let val = {};
                for(let x of LIST_OF_VALS){
                    val[x] = DataList[x].getValue();
                }
                PromptDataHistory.push(val);
            },

            getPromptDataHistory(){
                return PromptDataHistory;
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


class ValueData{
    constructor(name, value, max, color, icon){
        this._name = name;
        this._value = value;
        this._max = max;
        this._color = color;
        this._displayValue = value;
        this.iconReady = false;
        this.image = null;
        this.setIcon(icon);

    }

    getName(){
        return this._name;
    }

    getValue(){
        return this._value;
    }

    getMax(){
        return this._max;
    }

    getColor(){
        return this._color;
    }

    getDisplayValue(){
        this.updateDisplayValue();
        return this._displayValue;

    }

    updateDisplayValue(){
        this._displayValue = this._displayValue - (this._displayValue - this._value) * 0.2;
    }

    addValue(value){
        this._value += value;
    }

    setValue(value){
        this._value = value;
    }

    getIcon(){
        return this.image;
    }

    setIcon(icon){
        this._icon = icon;
        let image = new Image();
        var VDT = this;
        image.onload = function(){
            VDT.image = image;
        };
        image.src = icon;
        image.crossOrigin = "Anonymous";
    }

    getIconStatus(){
        return this.iconReady;
    }


}