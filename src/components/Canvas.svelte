<script>
    import { onMount } from "svelte";
    
    /**
     * use this element only inside onMount() 
    */
    export let _class = "";
    // let w;
    // let h;
    
    let root;
    let ctx;

    let fillStyle = "red";
    let draw_color = "black";
    let draw_width = "2"
    let is_drawing = false;


    onMount(()=>{
        root.width = root.offsetWidth;
        root.height = root.offsetHeight;

        ctx = root.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, root.width, root.height)



    })



    function prepDraw(e){
        is_drawing = true;

        ctx.beginPath();
        ctx.moveTo(
            e.clientX - root.offsetLeft,
            e.clientY - root.offsetTop);

    }

    function draw(e){
        if( !is_drawing ) {return;}
        
        ctx.lineTo(
            e.clientX - root.offsetLeft,
            e.clientY - root.offsetTop
        );

        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.lineWidth = draw_width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.stroke();
    }

    function stopDraw(){
        is_drawing = false;
    }

    

</script>

<canvas bind:this={root} 
class=" {_class} 
        border-2 border-secondary-700
        w-full h-96
        "

on:pointerdown|preventDefault={prepDraw} on:pointermove|preventDefault={draw}
on:pointerover={stopDraw} on:pointerup={stopDraw}
> 

</canvas>

<style>

</style>