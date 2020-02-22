class BarVisualizer{

    constructor(canvas, barWidth, barSeparation){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._barWidth = barWidth;
        this._barSeperation = barSeparation;
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

            index += 1;
        }

        this._ctx.fillStyle = "rgba(255,255,255,0.5)";

        //White marker lines
        for(let i = 0; i < 5; i++){
            this._ctx.fillRect(0, (this._canvas.height) * i / 5, this._canvas.width, 1);
        }

    }
}

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
}


class TimerVisualizer{
    constructor(canvas, totalTime){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._totalTime = totalTime;
        this._currentTime = totalTime;
        this._timer = null;

    }

    decreaseTime(){
        this._currentTime -= 0.1;
    }

    start(){
        //Start the timer.
        //Schedule an event.

        //if(this._timer == null){
        //    this._timer = setInterval(, 100); //Updates the timer every 0.1 seconds.
        //}
    }

    reset(){
        //Pause the timer.
        clearInterval(this._timer);
        this._timer = null;
        this._currentTime = this._totalTime;
    }

    drawVisuals(value){
        //just draw lol
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = "#00FF7F";
        this._ctx.strokeStyle = "rgba(1,1,1,0)";
        this._ctx.fillRect(0,0,this._canvas.width * (this._currentTime / this._totalTime), this._canvas.height);
        console.log(this._currentTime / this._totalTime);
    }
}