import { ref, onMounted, onUnmounted } from 'vue'
export default function useMousePosition() {
  const x = ref(10)
  const y = ref(10)

  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}