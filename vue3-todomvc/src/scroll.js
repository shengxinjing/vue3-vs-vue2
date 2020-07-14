import { ref, onMounted, onUnmounted } from 'vue'
export default function useScroll() {
  const top = ref(0)

  function update(e) {
    top.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', update)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { top }
}