var GAMEVALS = new Map();
var MAXVALS = new Map(); //Used for visualizing things.

var LIST_OF_VALS = ["Hunger","Food", "Security", "Population", "Military", "Science"];

function initVariables(){
    GAMEVALS.set("Hunger", 20);
    GAMEVALS.set("Food", 5);
    GAMEVALS.set("Security", 3);
    GAMEVALS.set("Population", 1000);
    GAMEVALS.set("Military", 100);
    GAMEVALS.set("Science", 50);

    MAXVALS.set("Hunger", 40);
    MAXVALS.set("Food", 20);
    MAXVALS.set("Security", 5);
    MAXVALS.set("Population", 1000);
    MAXVALS.set("Military", 100);
    MAXVALS.set("Science", 50);
}