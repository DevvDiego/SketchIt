<script>
    export let _class = "";
    export let w = "180px";
    export let h = "200px";

    function test(){return 0;}

</script>

<canvas width={w} height={h} 
class=" {_class} 
        border-2 border-secondary-700
        "

on:mousedown={test} on:mousemove={test}
on:pointerdown={test} on:pointermove={test}
>

</canvas>

<style>

</style>