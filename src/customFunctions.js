let FunctionManager = (function () {
    let instance;

    function createInstance() {
        let dm = DataManager.getInstance();

        let manual = {
            "secure": "//Usage: secure(). Increase security by a level, when possible. The max security is level 5.",
            "eat": "//Usage: eat(). Decrease food by 1, but also increase hunger by a small amount.",
            "choose": "Usage: choose(id), make a choice from the list of choice given.",
            "man": "Usage: man(command). check the command's usage and description."
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
            addPrompt(currPrompt.Prompt);
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
                return manual[funName];
            },
            legend(){

            },
            automate(fun){
                fun();
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