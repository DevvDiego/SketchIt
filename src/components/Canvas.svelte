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


    function move(){
        console.log("move")
        
    }

    function draw(){

    }

    

</script>

<canvas bind:this={root} width={w} height={h} 
class=" {_class} 
        border-2 border-secondary-700
        "
        
on:mousedown={move} on:mousemove={move}
on:pointerdown={move} on:pointermove={move}
> 

</canvas>

<style>

</style>