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

    let actions = [];

    let is_drawing = false;
    
    
    onMount(()=>{
        ctx = canvas.getContext("2d");

        function restore(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        //using debounce so its waits some time to redraw
        window.addEventListener("resize", debounce(resize,200));
        
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        /**
         * ! Add touch respective event listeners
        */
        
        resize();

        return ()=>{window.removeEventListener("resize",resize)}
    })

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

    

</script>

<canvas 
bind:this={canvas}
on:pointerdown={prepDraw} on:pointermove={draw}
on:pointerup={stopDraw} 


class=" {_class} 
        border-2 border-primary-500
        w-full h-4/6
        "
> 

</canvas>

<style>
    canvas{
        
    }

</style>