<script>
    import Canvas from "../components/Canvas.svelte";
    import Loading from "../components/Loading.svelte";

    let canvasMounted = false;

</script>

<main>

    <Loading bind:mounted={canvasMounted} />

    <Canvas  bind:isMounted={canvasMounted} />

</main>


<style>
</style>