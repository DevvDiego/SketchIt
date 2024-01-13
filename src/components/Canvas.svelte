<script>
    import { onMount } from "svelte";
    
    // export let _class = "";
    export let isMounted = false;


    let canvas;
    let ctx;
    let actions = [];
    let is_drawing = false;
    let config = {
        fill: "#ffffff",
        penColor: "#000000",
        lineWidth: "4",
        lineCap: "round",
        lineJoin: "round",
    }

    // let scale = 1;
    // let scaleStep = 0.1;

    
    onMount(()=>{
        ctx = canvas.getContext("2d");

        function restore(){
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillRect(0, 0, canvas.width, canvas.height)

        //No actions to draw
        if ( actions.length < 1 ) {return};

        // Redraw all actions
        for (let action of actions) {

            if(action.type === "background"){
                ctx.fillStyle = action.config.fill;

                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.stroke();

            } else if (action.type === 'begin') {
                ctx.beginPath();
                ctx.moveTo(action.x, action.y);

            } else if (action.type === 'draw') {
                ctx.fillStyle = action.config.fill;
                ctx.strokeStyle = action.config.penColor;
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

        //Call after first rezise to set the last config
        setConfig();
        drawBackground();

        isMounted = true;
        return ()=>{
            window.removeEventListener("resize", resize())
        }
    })


    function setConfig(){
        ctx.fillStyle = config.fill;
        ctx.strokeStyle = config.penColor;
        ctx.lineWidth = config.lineWidth;
        ctx.lineCap = config.lineCap;
        ctx.lineJoin = config.lineJoin;
    }

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

    function drawBackground(){
        setConfig();
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Guarda la acción de dibujo en el array de acciones
        actions.push({
            type: 'background',
            config: config
        });

        ctx.stroke();
    }

    function prepDraw(e){
        is_drawing = true;

        setConfig();
        console.log(config);
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




    
//why i used touch none: 
//https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not/48254578#48254578
</script>

<canvas
    bind:this={canvas}

    on:pointerdown|preventDefault={prepDraw}
    on:pointermove|preventDefault={draw}
    on:pointerup|preventDefault={stopDraw}
    on:pointerleave|preventDefault={stopDraw}

    class=" touch-none 
            border-b-[1px] border-secondary-500
            rounded-t-xl
            w-full
            "
> 

</canvas>

<ul>

    <li>
        <input type="color" bind:value={config.penColor}>
    </li>

    <li>
        <input
        bind:value={config.lineWidth}
        class="" 
        type="range" name="size" max="20.5" min="1" step="1.5"
        >
    </li>

    <!-- <li>
        <select name="penType" id="penType">
            <option value="brush">Brush</option>
            <option value="spray">Spray</option>
        </select>
    </li> -->

</ul>

<style>
    canvas{
        min-height: 75vh;
    }
    ul{
        height: 25vh;
    }
</style>