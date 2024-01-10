<script>
    export let mounted = false;
</script>

{#if !mounted}
    <div class="
        bg-background-950
        text-2xl text-primary-500
        "
    >
        <!-- ? Maybe add a Icon with an animation to wait loading -->
        <h1 class="
            text-center
            w-1/3 h-14 p-2
            border-2 border-accent-500 rounded-xl
            absolute top-2/4 left-2/4 
            transform -translate-x-1/2 -translate-y-1/2
            "
        >
            Loading...
        </h1>

    </div>

{:else}
    <!-- output nothing -->
{/if}

<style>
    div{
        width: 100vw;
        height: 100vh;
    }
</style>