<template>
    <div @mousedown="start" :style="{
        backgroundColor: 'lightblue', 
        width: '100px', height: '100px', 
        top: pos.y + 'px', left: pos.x + 'px', position: 'absolute'}"></div>
</template>
<script>
import LocalStorage from "./LocalStorage"
export default {
    data: () => ({
        pos: LocalStorage("pos", {x:20, y:20})
    }),
    methods: {
        start: function(event){
            this.startX = event.clientX;
            this.startY = event.clientY;
            
            this.startValue = { ...this.$data.pos };
            console.log(this.startValue)
            this.dragging = false;
            var move = event => {
                
                if (Math.abs(event.clientX - this.startX) > 3 ||
                    Math.abs(event.clientY - this.startY) > 3)
                    this.dragging = true;
                if (this.dragging) {
                    //console.log(this.$data.pos.x);
                    this.$data.pos.x = this.startValue.x + event.clientX - this.startX
                    this.$data.pos.y = this.startValue.y + event.clientY - this.startY
                }
            }

            var end = event => {
                document.removeEventListener('mousemove', move, false);
                document.removeEventListener('mouseup', end, false);
                this.dragging = false;
            }
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', end, false);
        }
    }
}
</script>