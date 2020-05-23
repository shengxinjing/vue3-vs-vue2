export default function monitor (action, fn,vm) {
    return function () {
        var s = window.performance.now()
        fn.apply(this, arguments)
        Vue.nextTick(function () {
        vm.action = action
        vm.time = window.performance.now() - s
        })
    }
}