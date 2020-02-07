class BarVisualizer{

    constructor(canvas, barWidth, barSeparation, colorScheme=VISCOL){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._colorScheme = colorScheme;
        this._barWidth = barWidth;
        this._barSeperation = barSeparation;
    }

    drawVisuals(value){
        let index = 0;
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas

        for(let x of LIST_OF_VALS){
            let height = this._canvas.height * (value.get(x) / MAXVALS.get(x));

            this._ctx.fillStyle = this._colorScheme.get(x);
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

class Bar{
    constructor(dataname){
        this._dataname = dataname;
    }
    
}