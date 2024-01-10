<script>
    import Canvas from "../components/Canvas.svelte";

    let mounted = "no";
    let elm;

    /**
     * Make func that states canvas is loading using this mounted method
    */
    $: elm = mounted; 

</script>

<main class="">
    <h1 bind:innerHTML={elm} contenteditable 
    class="
    text-2xl text-text-100
    absolute top-2/4 left-2/4 
    transform -translate-x-1/2 -translate-y-1/2
    ">
        SketchIt app
    </h1>

    <Canvas  bind:isMounted={mounted} />

</main>


<style>
</style>