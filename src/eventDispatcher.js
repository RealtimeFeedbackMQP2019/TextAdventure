let EventDispatcher = (function () {
    let instance;

    function createInstance() {
        let registered = [];
        return{
            signup(item){
                registered.push(item);
            },
            fireEvent(event){
                for(let i in registered){
                    i.handleEvent();
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
});

class EventHandler{
    constructor(name){
        this.name = name;
    }
    handleEvent(){
        
    }
}