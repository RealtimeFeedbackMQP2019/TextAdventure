let EventDispatcher = (function () {
    let instance;


    function createInstance() {
        let registered = [];

        return {
            signup(item){
                registered.push(item);
            },
            fireEvent(event){
                for(let i in registered){
                    i.handleEvent(event);
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