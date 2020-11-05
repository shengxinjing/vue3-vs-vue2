
import {ref, computed} from 'vue'

export default function useCounter(){
    let count = ref(1)
    function add(){
        count.value++
    }
    let double = computed(()=>count.value*2)
    return {count, double, add}
}

