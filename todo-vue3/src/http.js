import {reactive, ref, effect} from "@vue/reactivity";
import axios from "axios";


export default async function(url,defaultValue){
    let obj = reactive({});
    const {data}  = await axios.get(url)
    Object.assign(obj, defaultValue,data);
    console.log(obj)
    effect(() => axios.post(url,data),{lazy:true});
    return data;

}

