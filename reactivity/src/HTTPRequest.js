import {reactive} from "@vue/reactivity";


export default function HTTPRequest(url, method, headers){
    let data = reactive({});
    fetch(url)
        .then(response => response.json())
        .then(d => Object.assign(data, d));
    return data;
}
