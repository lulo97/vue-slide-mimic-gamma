import { ref } from "vue"

// holds the currently active editor id
export const activeEditorId = ref(null)

export function openBubble(id) {
  activeEditorId.value = id
}

export function closeBubble(id) {
  if (activeEditorId.value === id) {
    activeEditorId.value = null
  }
}
