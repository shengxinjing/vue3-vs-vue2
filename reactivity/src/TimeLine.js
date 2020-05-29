import {reactive} from "@vue/reactivity";
let timer = {
    t: 0
}
let observer = reactive(timer);

setInterval(function(){
    observer.t = Date.now();
}, 1000)

export default observer;