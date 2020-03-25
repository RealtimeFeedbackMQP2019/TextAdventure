const HandlerPriority = {
    EARLIEST : -2,
    EARLIER : -1,
    DEFAULT: 0,
    LATER : 1,
    LATEST: 2
};
Object.freeze(HandlerPriority);


let EventDispatcher = (function () {
    let instance;


    function createInstance() {

        let registered = new Map();

        function pushItem(item, priority){
            if(!registered.has(priority)){
                registered.set(priority, []);
            }
            registered.get(priority).push(item);
            console.log(registered);
        }

        return {
            signup(item, priority=HandlerPriority.DEFAULT){
                pushItem(item, priority);
            },
            fireEvent(event){

                for(let i = -2; i <= 2; i++){
                    if(registered.has(i)){
                        for(let j = 0; j < registered.get(i).length; j++){
                            console.log(registered.get(i)[j]);
                            eh.handleEvent(event);
                        }
                    }
                }
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

class GameEvent{
    constructor(name, additionalData){
        this.name = name;
        this.data = additionalData;
    }
}

class EventHandler{
    constructor(){

    }
    handleEvent(event){

    }
}

