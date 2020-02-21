let DataManager = (function () {
    let instance;

    function createInstance() {
        //Initialize things here.
        let DataList = {
            "Hunger": new ValueData("Hunger", 999, 40, "rgba(255,127,0,1.0)"),
            "Food": new ValueData("Food", 5, 20, "rgba(255,64,0,1.0)"),
            "Security": new ValueData("Security", 3, 5, "rgba(0,127,255,1.0)"),
            "Population": new ValueData("Population", 1000, 1000, "rgba(0,255,64,1.0)"),
            "Military": new ValueData("Military", 100, 100, "rgba(255,0,127,1.0)"),
            "Science": new ValueData("Science", 50, 50, "rgba(127,0,255,1.0)")
        };

        return{
            addToValue(key, value){
                let dEntry = DataList[key];
                if(dEntry !== null && dEntry.getValue() + value < 0){
                    dEntry.setValue(0);
                }
                else{
                    dEntry.addValue(value);
                }
                this.updateDisplayVariables();
                this.checkGameStatus();
            },

            subtractFromValue(key, value){
                    this.addToValue(key, -value);
            },

            getValue(key){
                return DataList[key];
            },

            checkGameStatus(){
                // Check for game loss condition
                if(DataList["Hunger"].getValue() <= 0){
                    clearInterval(gameTickUpdate);
                    document.getElementById("gameOver").innerHTML = "GAME OVER";
                    document.getElementById("gameOver").style.display = "inline";
                    // Somehow disable commands from being entered
                    document.getElementById("textEditorBox").style.pointerEvents = "none";
                }

                // Check for game win condition
                if(currPrompt === "CONGRATS, YOU WON!") {
                    clearInterval(gameTickUpdate);
                    document.getElementById("gameOver").innerHTML = "YOU'RE WINNER";
                    document.getElementById("gameOver").style.display = "inline";
                }
            },

            updateDisplayVariables(){
                // for(let key in DataList){
                //     document.getElementById(key).innerHTML = DataList[key].getValue();
                // }
            },

            getDataList(){
                return DataList;
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