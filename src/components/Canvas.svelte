<script>
    import { onMount } from "svelte";

    
    export let _class = "";
    let canvas;
    let ctx;
    let config = {
        fillStyle: "white",
        strokeStyle: "red",
        lineWidth: "2",
        lineCap: "round",
        lineJoin: "round",
    }

    let data = {
        content: []
    }

    let currentData;
    let biggestData;

    let is_drawing = false;
    
    
    onMount(()=>{
        ctx = canvas.getContext("2d");

        function save(){
            currentData = ctx.getImageData(0,0,canvas.width,canvas.height)
            console.log(currentData);
        }

        function restore(){
            ctx.putImageData(currentData,0,0);
        }
        
        function resize(){
            save();
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            restore();
        }

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        window.addEventListener("resize", resize);
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        resize();


        


        return ()=>{window.removeEventListener("resize",resize)}
    })




    function prepDraw(e){
        is_drawing = true;

        ctx.beginPath();
        ctx.moveTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop);

    }

    function draw(e){
        if( !is_drawing ) {return;}
        
        ctx.lineTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop
        );

        //is it really neccessary to rewrite these every time?
        ctx.fillStyle = config.fillStyle;
        ctx.strokeStyle = config.strokeStyle;
        ctx.lineWidth = config.lineWidth;
        ctx.lineCap = config.lineCap;
        ctx.lineJoin = config.lineJoin;

        ctx.stroke();
    }

    function stopDraw(){
        is_drawing = false;
    }

    

</script>

<canvas 
bind:this={canvas}
on:pointerdown|preventDefault={prepDraw} on:pointermove|preventDefault={draw}
on:pointerup={stopDraw}

class=" {_class} 
        border-2 border-primary-500
        w-full h-96
        "
> 

</canvas>

<style>

</style>