class BarVisualizer{

    constructor(canvas, barWidth, barSeparation, doPreview=false){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._barWidth = barWidth;
        this._barSeperation = barSeparation;
        this._doPreview = doPreview;
    }

    drawVisuals(){
        let index = 0;
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas

        for(let x of LIST_OF_VALS){
            let dataval = DataManager.getInstance().getDataList()[x];
            let height = this._canvas.height * (dataval.getDisplayValue() / dataval.getMax());

            this._ctx.fillStyle = dataval.getColor();
            this._ctx.strokeStyle = "rgba(1,1,1,0)";
            this._ctx.fillRect(index * this._barWidth + this._barSeperation * (index + 1), (this._canvas.height - height), this._barWidth, height);

            if(this._doPreview){
                //Something something...

                let param = DataManager.getInstance().getPreviewValues();
                if(param != null && param.hasOwnProperty(x)){
                    this._ctx.fillStyle = "#FFFFFF00";
                    this._ctx.strokeStyle = "#FFFFFF";
                    let incrheight = this._canvas.height * (param[x] / dataval.getMax());
                    this._ctx.strokeRect(index * this._barWidth + this._barSeperation * (index + 1),
                        (this._canvas.height - height - incrheight), this._barWidth, incrheight);
                    //console.log(height - incrheight);
                }

            }


            index += 1;
        }

        this._ctx.fillStyle = "rgba(255,255,255,0.5)";

        //White marker lines
        for(let i = 0; i < 5; i++){
            this._ctx.fillRect(0, (this._canvas.height) * i / 5, this._canvas.width, 1);
        }



    }
}


class TimerVisualizer{
    constructor(canvas, totalTime){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._totalTime = totalTime;
        this._currentTime = totalTime;
        this._pause = false;

    }

    decreaseTime(){
        if(this._pause){
            return;
        }
        this._currentTime -= 0.1;
        if(this._currentTime < 0.0){
            //Time's up!
            this.reset();
            appendText(commandPrompt, "\n// Time's up baby!");
            makeRandomChoice();
        }
    }

    start(){
        //Start the timer.
        //Schedule an event.

        //if(this._timer == null){
        //    this._timer = setInterval(, 100); //Updates the timer every 0.1 seconds.
        //}
    }

    pause(){
        this._pause = true;
    }

    reset(){
        //Pause the timer.
        this._currentTime = this._totalTime;
        this._pause = false;
    }

    drawVisuals(){
        //just draw lol
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = "#00FF7F";
        this._ctx.strokeStyle = "rgba(1,1,1,0)";
        this._ctx.fillRect(0,0,this._canvas.width * (this._currentTime / this._totalTime), this._canvas.height);
        //console.log(this._currentTime / this._totalTime);
    }
}


class LineGraphVisualizer{
    constructor(canvas, key){
        this._canvas = canvas;

        this._ctx = canvas.getContext("2d");
        this._key = key;
    }
    drawVisuals(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas
        let DataSet = DataManager.getInstance().getPromptDataHistory();
        this.DataSet = DataSet;
        let length = DataSet.length;
        let base = 0;
        let separation;
        if(length === 0 || length === 1){
            base = 0.5 * this._canvas.width;
            separation = 1;
        }
        else{
            separation = this._canvas.width / (length - 1);
        }


        this._ctx.beginPath();

        for(let key of this._key){
            let max = DataManager.getInstance().getValue(key).getMax();

            this._ctx.lineWidth = 1;
            this._ctx.strokeStyle = DataManager.getInstance().getValue(key).getColor();

            for(let i = 0; i < length; i++){
                let precentage = DataSet[i][key] / max;
                let height = (1-precentage) * this._canvas.height;
                if(i === 0){
                    this._ctx.moveTo(base + i * separation, height);
                }else{
                    this._ctx.lineTo(base + i * separation, height);
                }
            }
            this._ctx.stroke();

            for(let i = 0; i < length; i++){
                if(i === 0 || i === length - 1){
                    let precentage = DataSet[i][key] / max;
                    let height = (1-precentage) * this._canvas.height;
                    this.drawCircle(base + i*separation, height, DataManager.getInstance().getValue(key).getColor(), 2);
                }

            }
        }


        /*
        for(let i = 0; i < length; i++){
            let precentage = DataSet[i][this._key] / max;
            let height = (1-precentage) * this._canvas.height;
            this.drawCircle(i*separation, height, DataManager.getInstance().getValue(this._key).getColor(), 2);
        }*/

    }
    drawCircle(centerx, centery, color, radius){

        this._ctx.beginPath();
        this._ctx.arc(centerx, centery, Math.min(this._canvas.height / 2 - 3,radius), 0, (2 * Math.PI));

        this._ctx.fillStyle = color;
        this._ctx.strokeStyle = "rgba(1,1,1,0)"
        this._ctx.fill();

    }
}

/*
class CircularVisualizer{
    constructor(canvas, circleRadius, circleSeparation){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._radius = circleRadius / 2;
        this._circleSeparation = circleSeparation;

    }

    drawVisuals(value){
        let index = 0;
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas
        for(let x of LIST_OF_VALS){
            let dataval = DataManager.getInstance().getDataList()[x];
            let percentage = dataval.getDisplayValue() / dataval.getMax();

            this.drawHollowCircle((index + 1) * (this._radius * 2) + this._circleSeparation * (index + 1),
                this._canvas.height / 2, percentage, dataval.getColor());
            index += 1;
        }
    }

    drawHollowCircle(centerx, centery, percentage, color){

        this._ctx.beginPath();
        this._ctx.arc(centerx, centery, Math.min(this._canvas.height / 2 - 3,this._radius), 0 - 0.5 * Math.PI, (2 * Math.PI) * percentage  - 0.5 * Math.PI);

        this._ctx.fillStyle = "rgba(1,1,1,0)";
        this._ctx.lineWidth = 3;
        this._ctx.strokeStyle = color;
        this._ctx.stroke();

    }

    clamp(min,val,max){
        return Math.min(Math.max(min, val), max)
    }
}


class StockMarketVisualizer{
    constructor(canvas, fontSize){

    }
}*/