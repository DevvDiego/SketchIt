<script>
    import { onMount } from "svelte";

    
    export let _class = "";
    export let isMounted = false;

    let canvas;
    let ctx;
    let config = {
        fillStyle: "white",
        strokeStyle: "purple",
        lineWidth: "2",
        lineCap: "round",
        lineJoin: "round",
    }

    let scale = 1;
    let scaleStep = 0.1;

    let actions = [];

    let is_drawing = false;
    
    
    onMount(()=>{
        ctx = canvas.getContext("2d");

        function restore(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Reproduce todas las acciones de dibujo en el lienzo
            for (let action of actions) {

                if (action.type === 'begin') {
                    ctx.beginPath();
                    ctx.moveTo(action.x, action.y);

                } else if (action.type === 'draw') {
                    ctx.fillStyle = action.config.fillStyle;
                    ctx.strokeStyle = action.config.strokeStyle;
                    ctx.lineWidth = action.config.lineWidth;
                    ctx.lineCap = action.config.lineCap;
                    ctx.lineJoin = action.config.lineJoin;

                    ctx.lineTo(action.x, action.y);
                    ctx.stroke();

                }

            }
        }
        
        function resize(){
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            restore();
        }

        window.addEventListener("resize", debounce(resize,200) );
        resize();

        isMounted = true;
        return ()=>{
            window.removeEventListener("resize",resize)
        }
    })

    /**
     * 
     * Recieves a callback func that will execute only when the wait time is finished 
     * 
     * @param func callback
     * @param wait miliseconds to wait
     */
    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };


    function prepDraw(e){
        is_drawing = true;

        ctx.beginPath();
        ctx.moveTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop);

        // Guarda la acción de inicio de dibujo en el array de acciones
        actions.push({
            type: 'begin',
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop,
            config: config
        });

    }

    //why i used touch none: 
    //https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not/48254578#48254578
    function draw(e){
        
        if( !is_drawing ) {return;}

        ctx.lineTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop
        );

        // Guarda la acción de dibujo en el array de acciones
        actions.push({
            type: 'draw',
            x: e.clientX - canvas.offsetLeft,
            y: e.clientY - canvas.offsetTop,
            config: config
        });

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

    // function zoomIn() {
    //     scale += scaleStep;
    //     ctx.scale(scale, scale);
    //     restore();
    // }

    // function zoomOut() {
    //     scale -= scaleStep;
    //     ctx.scale(scale, scale);
    //     restore();
    // }




    

</script>

<canvas
    bind:this={canvas}

    on:pointerdown|preventDefault={prepDraw}
    on:pointermove|preventDefault={draw}
    on:pointerup|preventDefault={stopDraw}
    on:pointerleave|preventDefault={stopDraw}

    class=" {_class} touch-none 
            border-2 border-primary-500
            w-full
            "
> 

</canvas>

<style>
    canvas{
        min-height: 75vh;
    }
</style>