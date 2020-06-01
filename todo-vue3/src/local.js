import {reactive, ref, effect} from "@vue/reactivity";


export default function(key, defaultValue= [{
    id: "1",
    title: "吃饭",
    completed: false
  }]){
    let data = reactive({});

    Object.assign(data, localStorage[key] && JSON.parse(localStorage[key]) || defaultValue);

    effect(() => localStorage[key] = JSON.stringify(data));
    console.log(data)
    return data;
}
