let DataManager = (function () {
    let instance;

    function createInstance() {
        //Initialize things here.
        let DataList = {
            "Hunger": new ValueData("Hunger", 30, 40, "rgba(255,127,0,1.0)"),
            "Food": new ValueData("Food", 5, 20, "rgba(255,64,0,1.0)"),
            "Security": new ValueData("Security", 3, 5, "rgba(0,127,255,1.0)"),
            "Population": new ValueData("Population", 200, 1000, "rgba(0,255,64,1.0)"),
            "Military": new ValueData("Military", 100, 100, "rgba(255,0,127,1.0)"),
            "Science": new ValueData("Science", 50, 50, "rgba(127,0,255,1.0)")
        };

        let PromptDataHistory = [];

        let timer = new TimerVisualizer(document.getElementById("timer"),45);
        setInterval(function(){
            timer.decreaseTime();
        }, 100);
        visUpdate(timer);

        let previewValues = {};

        // Normal decrease rates for hunger, population, military, and science in order
        let statDecreaseRates = [1, 2, 3, 3];

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
                    //write to firebase - get current age stats even if age isnt over
                    ageList.push(getStatsPerAge(ageChoices));
                    writeResults();

                    this.pauseTimer();
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
                    //document.getElementById("gameOver").style.display = "inline";
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

            resetTimer(){
                DataManager.getInstance().setStatDecreaseRates(1, 2, 3, 3);
                timer.reset();
            },

            pauseTimer(){
                DataManager.getInstance().setStatDecreaseRates(0, 0, 0, 0);
                timer.pause();
            },

            getTimer(){
                return timer;
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

            getStatDecreaseRates(){
                return statDecreaseRates;
            },

            setStatDecreaseRates(hun, pop, mil, sci){
                statDecreaseRates = [];
                statDecreaseRates.push(hun, pop, mil, sci);
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


class ValueData{
    constructor(name, value, max, color){
        this._name = name;
        this._value = value;
        this._max = max;
        this._color = color;
        this._displayValue = value;
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


}