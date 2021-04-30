import { ref } from 'vue'

export default function useMapping () {
  const map = ref(42)
  function embedId () {
    // do something
  }
  return { map, embedId }
}
