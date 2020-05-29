<template>
    <div
        camera="PerspectiveCamera"
        :cameraPos={z:1}
        scene="Scene"
        geometry="BoxGeometry"
        :geometryArg="[0.2,0.2,0.2]"
        material="MeshNormalMaterial"
        mesh="Mesh"
        :meshY="y"
        :meshX="x"
    >
    </div>

</template>

<script>
import {ref} from 'vue'
export default {
    setup(){
        const y = ref(0.3)
        const x = ref(0.3)
        setInterval(()=>{
            y.value+=0.3
            x.value+=0.5
        },100)
        return {y,x}
    }
}
</script>