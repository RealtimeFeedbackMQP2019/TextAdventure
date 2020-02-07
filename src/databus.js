let LevelManager = (function () {
    let instance;

    function createInstance() {
        //Initialize things here.
        let DataList = {
            "Hunger": new ValueData("Hunger", 999, 40, "rgba(255,127,0,1.0)"),
            "Food": new ValueData("Food", 999, 40, "rgba(255,127,0,1.0)"),
            "Security": new ValueData("Security", 999, 40, "rgba(255,127,0,1.0)"),
            
        };



        DataList.push(new ValueData("Hunger", 999, 40, "rgba(255,127,0,1.0)"));
        DataList.push(new ValueData("Food", 999, 40, "rgba(255,127,0,1.0)"));
        DataList.push(new ValueData("Security", 999, 40, "rgba(255,127,0,1.0)"));
        DataList.push(new ValueData("Population", 999, 40, "rgba(255,127,0,1.0)"));
        DataList.push(new ValueData("Military", 999, 40, "rgba(255,127,0,1.0)"));
        DataList.push(new ValueData("Science", 999, 40, "rgba(255,127,0,1.0)"));


        return{

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
}