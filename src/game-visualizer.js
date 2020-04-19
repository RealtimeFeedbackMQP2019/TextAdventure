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
        /*
        for(let i = 0; i < 5; i++){
            if(i === 0 || i === 4){
                this._ctx.fillRect(0, (this._canvas.height) * i / 4, this._canvas.width, 1);
            }

        }*/
        this._ctx.fillRect(0, (this._canvas.height - 1), this._canvas.width, 1);
        this._ctx.fillRect(0, 0, this._canvas.width, 1);

    }
}


class TimerVisualizer{
    constructor(canvas, totalTime, color){
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._totalTime = totalTime;
        this._currentTime = totalTime;
        this._pause = false;
        this._color = color;

    }

    decreaseTime(){
        if(this._pause){
            return;
        }
        this._currentTime -= 0.1;
        if(this._currentTime < 0.0){
            //Time's up!
            this.reset();
            appendText(commandPrompt, "\n// Time's up!");
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

    resume(){
        this._pause = false;
    }

    reset(){
        //Pause the timer.
        this._currentTime = this._totalTime;
        this._pause = false;
    }

    getTime(){
        return this._currentTime;
    }

    drawVisuals(){
        //just draw lol
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillStyle = this._color;
        this._ctx.strokeStyle = "rgba(1,1,1,0)";
        this._ctx.fillRect(0,0,this._canvas.width * (this._currentTime / this._totalTime), this._canvas.height);
        //console.log(this._currentTime / this._totalTime);
    }
}



const LINEGRAPH_WIDTH = 30;
const LINEGRAPH_HEIGHT = 7;
const LINEGRAPH_ORIGIN = -1;
const LINEGRAPH_SPACING = 4;

const VALUE_WIDTH = 25;
const SPACING = 13;
const ICON_WIDTH = 14;
const ICON_HEIGHT = 11;


class ComboVisualizer{
    constructor(canvas, barWidth, barSeparation){
        this._canvas = canvas;

        this._ctx = canvas.getContext("2d");
        //this._key = key;
        this._barWidth = VALUE_WIDTH;
        this._barSeperation = SPACING;
        this._ctx.imageSmoothingEnabled = true;
    }
    //Draw visuals:
    drawVisuals(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        let index = 0;
        let lgpos_x = LIST_OF_VALS.length * this._barWidth + this._barSeperation * (LIST_OF_VALS.length + 1);
        let lgpos_y = LINEGRAPH_ORIGIN;
        for(let x of LIST_OF_VALS){

            let posx = index * this._barWidth + this._barSeperation * (index) + Math.round(ICON_WIDTH*2/3);
            let boundx = posx + this._barWidth;
            let posy = 0;
            let boundy = this._canvas.height;

            //This is working!


            this.drawBarGraph(posx+0.5, boundx+0.5, posy, boundy, x, true);
            this.drawIcon(Math.round(posx - ICON_WIDTH*2/3), Math.round((this._canvas.height - ICON_HEIGHT)/2), x);


            //Now for the line graphs
            if(index % 3 === 0){
                lgpos_y = LINEGRAPH_ORIGIN;
                if(index !== 0){
                    lgpos_x += ICON_WIDTH+LINEGRAPH_WIDTH+LINEGRAPH_SPACING * 2;
                }

            }
            else{
                lgpos_y += ICON_HEIGHT + LINEGRAPH_SPACING - 3;
            }

            this.drawIcon(lgpos_x, lgpos_y, x);

            let DataSet = DataManager.getInstance().getPromptDataHistory();
            this.drawLines(lgpos_x+ICON_WIDTH+LINEGRAPH_SPACING, lgpos_x+ICON_WIDTH+LINEGRAPH_SPACING+LINEGRAPH_WIDTH,
                lgpos_y, lgpos_y+LINEGRAPH_HEIGHT - 1, DataSet, x);
            index += 1;
        }
    }

    drawBarGraph(x,xl,y,yl,key,dopreview=false){
        //draw boundaries
        let dataval = DataManager.getInstance().getDataList()[key];
        let color = dataval.getColor();
        let gHeight = yl - y;
        let gWidth = xl - x;

        let gPercentage = (dataval.getDisplayValue() / dataval.getMax());
        gPercentage = Math.min(Math.max(0, gPercentage), 1);
        let drawBaseY = y + (1-gPercentage) * gHeight;

        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, drawBaseY, gWidth-1, gHeight * gPercentage);

        if(dopreview){
            let param = DataManager.getInstance().getPreviewValues();
            if(param != null && param.hasOwnProperty(key)){
                let incrprecent = gHeight * param[key] / dataval.getMax();
                let ypos = drawBaseY - incrprecent;
                if(ypos < y) ypos = y;
                this.drawLine({x:x, y:ypos}, {x:xl-1, y:ypos});
            }
        }

        this.drawLine({x: x, y: y}, {x: x, y: yl});
        this.drawLine({x: xl-1, y: y}, {x: xl-1, y: yl});
    }


    drawIcon(x,y,key){
        let dataval = DataManager.getInstance().getDataList()[key];
        let icon = dataval.getIcon();
        if(icon != null){
            this._ctx.drawImage(icon, x, y, ICON_WIDTH, ICON_HEIGHT);
        }
    }

    drawLine(s1, s2, width=1, col="#FFFFFF"){
        this._ctx.strokeStyle = col;
        this._ctx.lineWidth = width;
        this._ctx.beginPath();
        this._ctx.moveTo(s1.x,s1.y);
        this._ctx.lineTo(s2.x,s2.y);
        this._ctx.stroke();
    }



    drawLines(basex, boundx, basey, boundy, DataSet, key){

        let max = DataManager.getInstance().getValue(key).getMax();
        let color = DataManager.getInstance().getDataList()[key].getColor();
        let length = DataSet.length;

        let height = boundy - basey;
        let width = boundx - basex;

        let offsetBase = 0;
        let separation = width / 4;
        let points = [];
        for(let i = 0; i < 5; i++){
            let index = i + length - 5;
            if(length === 0){
                break;
            }
            else{
                if(index < 0){
                    index = 0;
                }
            }
            let percentage = DataSet[index][key] / max;
            percentage = Math.min(Math.max(0, percentage), 1);
            let h = (1-percentage) * height;
            points.push({x: basex + offsetBase + i * separation, y: basey + h})
        }

        for(let i = 1; i < points.length; i++){
            this.drawPixelPerfectLine(points[i-1],points[i], color);
        }

    }

    //credit: Redblobgames
    drawPixelPerfectLine(p1, p2, color){
        //First, get the diagonal distance.
        let dist = this.diagonalDistance(p1, p2);
        let imgData = this._ctx.getImageData(0,0,this._canvas.width, this._canvas.height);
        let data = imgData.data;
        for(let i = 0; i <= dist; i++){
            let t = dist === 0? 0.0 : i / dist;
            //points.push();
            let p = this.roundPoint(this.lerpPoint(p1, p2, t));
            this.setPixel(data, p.x, p.y, color);
        }
        this._ctx.putImageData(imgData, 0, 0);
    }

    setPixel(data, x, y, color="#FFFFFF") {
        let n = (y * this._canvas.width + x) * 4;
        let col = this.hexToRgb(color);
        data[n] = col.r;
        data[n + 1] = col.g;
        data[n + 2] = col.b;
        data[n + 3] = 255;
    }

    hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    //credit: Redblobgames
    roundPoint(p){
        return {x:Math.round(p.x), y:Math.round(p.y)}
    }

    //credit: RedBlobGames
    diagonalDistance(p0, p1) {
        let dx = p1.x - p0.x, dy = p1.y - p0.y;
        return Math.max(Math.abs(dx), Math.abs(dy));
    }
    //credit: Redblobgames
    lerpPoint(p0, p1, t){
        return {x: this.lerp(p0.x, p1.x, t), y: this.lerp(p0.y, p1.y, t)};
    }
    //credit: Redblobgames
    lerp(start, end, t) {
        return start + t * (end-start);
    }

}
