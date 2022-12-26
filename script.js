// Get a reference to the canvas element and the context
const canvas = document.getElementById('main');
const context = canvas.getContext('2d', { willReadFrequently: true });

context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight - 200;

canvas.heigth = window.innerHeight - 200; 



const undoButton = document.getElementById("undoButton");
const clearButton = document.getElementById("clearButton");
const brushType = document.getElementById("brushType");
const brushRange = document.getElementById("brushRange");
const brushColor = document.getElementById("brushColor");


class DrawApp{

    constructor(){

        //history of the canvas
        this.actions = [];


    }

    //priv functions


    #CheckActionsMade(actionsMade){
        if(actionsMade >= 50){
            this.actions.push(
                context.getImageData(0,0,canvas.width,canvas.height)
            );
            
            actionsMade = 0;
            return actionsMade;

        }else if(actionsMade<50){
            actionsMade++;

            return actionsMade;

        }else{
            //do nothing
            return;
        }
    }

    #DrawFigure(ev){
        if(this.brushType == "lines"){

            // Use the context to draw a line on the canvas
            context.beginPath();
            context.moveTo(this.lastX, this.lastY);
            context.lineTo(ev.offsetX, ev.offsetY);
            context.strokeStyle = this.currentColor;
            context.lineWidth = this.brushSize;
            context.stroke();


        }else if(this.brushType == "dots"){

            // Use the context to draw the circle
            context.beginPath();
            context.arc(ev.offsetX, ev.offsetY, this.radius, 0, Math.PI * 2, false);
                console.log();
            context.fillStyle = this.currentColor;
            context.fill();


        }

        // Update the pen state for the next move event
        this.lastX = ev.offsetX;
        this.lastY = ev.offsetY;

    }

    #CanvasEventListeners(){
        let actionsMade = 0;

        canvas.addEventListener("pointerdown", (ev) =>{

            this.isDrawing = true;

            this.lastX = ev.offsetX;
            this.lastY = ev.offsetY;

        });



        canvas.addEventListener("pointermove", (ev)=>{
            if (!this.isDrawing) {return};


            this.#DrawFigure(ev);

            actionsMade = this.#CheckActionsMade(actionsMade);


        });


        canvas.addEventListener("pointerup", () => {
            this.isDrawing = false;

        });


        canvas.addEventListener("pointerout", ()=>{
            this.isDrawing = false;

        });


        canvas.addEventListener("pointerleave", ()=>{
            this.isDrawing = false;

        });

    }



    #UndoButton(){

        undoButton.addEventListener("click",()=>{
            const lastChange = this.actions.pop();
            
            if(lastChange){
                context.putImageData(lastChange,0,0);
            }
            
        });


        // Clear the canvas first
        
        // undoButton.addEventListener("click",()=>{

        //     context.clearRect(0,0,canvas.width,canvas.height);
            
        //     // Remove the last 5 actions from the actions array
        //     for(let i=0;i<5;i++){
        //         this.actions.pop();
        //     }
        //     console.log(this.actions);


        //     this.drawLastActions();
        //     // drawLastActions(){
        //     //     //for some reason this doesnt draw
        //     //     // Redraw the canvas from the remaining actions
        //     //     this.actions.forEach((action) => {
        //     //         context.beginPath();
        //     //         context.moveTo(action.startX, action.startY);
        //     //         context.lineTo(action.endX, action.endY);
        //     //         context.strokeStyle = action.color;
        //     //         context.lineWidth = action.size;
        //     //         context.stroke();
        //     //         console.log("drawing");

        //     //     });
        //     // }

            
        // });


    }

    #ClearButton(){
        clearButton.addEventListener("click",()=>{
            context.clearRect(0,0,canvas.width,canvas.height);
            this.actions = [];
        });

    }

    #BrushType(){
        brushType.addEventListener("change",()=>{
            this.brushType = brushType.value;

        })
    }

    #BrushSize(){

        brushRange.addEventListener("change",()=>{
            this.brushSize = brushRange.value;
            this.radius = brushRange.value;
        });

    }

    #BrushColor(){
        brushColor.addEventListener("change",()=>{
            this.currentColor = brushColor.value;
        })

    }


    

    #initCanvas(){

        this.isDrawing = false;

        this.width = canvas.width;
        this.height = canvas.height;

        //pen variables
        this.lastX = 0;
        this.lastY = 0;
        this.currentColor = brushColor.value;
        this.brushSize = 5;
        this.brushType = "dots";

        //for the circle pen
        this.radius = 5;


        this.#CanvasEventListeners();



    }




    #initTools(){
        this.#UndoButton();
        this.#ClearButton();
        this.#BrushType();
        this.#BrushSize();
        this.#BrushColor();
    }    
    
    
    
    init(){
        this.#initCanvas();
        this.#initTools();
    }
} 


const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};




var Draw = new DrawApp();

Draw.init();



