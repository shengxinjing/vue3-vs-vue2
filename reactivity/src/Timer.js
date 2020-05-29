import {reactive} from "@vue/reactivity";

let timer = {
    t: 0
}

let observer = reactive(timer);

let begin = Date.now();

setInterval(function(){
    observer.s = new Date().getSeconds();
    observer.m = new Date().getMinutes();
    observer.h = new Date().getHour();
}, 500);


export default observer;