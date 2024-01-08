<script>
    import { onMount } from "svelte";
    
    /**
     * use this element only inside onMount() 
    */
    export let _class = "";
    export let w = "180px";
    export let h = "200px";
    
    let root;
    let ctx;

    let fillStyle = "white";
    let draw_color = "black";
    let draw_width = "2"
    let is_drawing = false;


    onMount(()=>{
        ctx = root.getContext("2d");
        ctx.fillStyle = fillStyle;
        ctx.fillRect(0, 0, root.width, root.height)



    })

    function prepDraw(e){
        is_drawing = true;
        ctx.beginPath();
        ctx.moveTo(
            e.clientX - root.offsetLeft,
            e.clientY - root.offsetTop);

    }

    function draw(){
        if( is_drawing ){
            ctx.moveTo(
            e.clientX - root.offsetLeft,
            e.clientY - root.offsetTop);

            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();


        }
    }

    

</script>

<canvas bind:this={root} width={w} height={h} 
class=" {_class} 
        border-2 border-secondary-700
        "

on:pointerdown|preventDefault={prepDraw} on:pointermove|preventDefault={draw}
> 

</canvas>

<style>

</style>