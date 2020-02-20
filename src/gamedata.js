var GAMEVALS = new Map();
var MAXVALS = new Map(); //Used for visualizing things.

var LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

function addToValue(key, value){
    DataManager.getInstance().addToValue(key, value);
}

function subtractFromValue(key, value){
    DataManager.getInstance().addToValue(key, -value);
}
