import {reactive} from "@vue/reactivity";


export default function HTTPRequest(){
    let data = reactive({});
    data.value = document.location.hash;
    window.addEventListener("hashchange", (v1, v2) => {
        data.value = document.location.hash
    })
    return data;
}
