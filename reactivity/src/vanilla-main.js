import {reactive, ref, effect} from "@vue/reactivity";

let data = ref(1);

let input1 = document.createElement("input");

document.getElementById("app").appendChild(input1);


input1.addEventListener("input", (event) => {
    data.value = event.target.value;
})
effect(()=> input1.value = data.value)


let input2 = document.createElement("input");
document.getElementById("app").appendChild(input2);

input2.addEventListener("input", (event) => {
    data.value = event.target.value;
})
effect(()=> input2.value = data.value)