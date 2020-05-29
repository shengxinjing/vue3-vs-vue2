import {reactive, ref, effect} from "@vue/reactivity";


export default function LocalStorage(key, defaultValue){
    let data = reactive({});

    Object.assign(data, localStorage[key] && JSON.parse(localStorage[key]) || defaultValue);

    effect(() => localStorage[key] = JSON.stringify(data));

    return data;
}
