// stores/bubbleMenuStore.js
import { ref } from "vue";

export const toolMenuId = ref(null);

export function setActiveToolMenu(id) {
  toolMenuId.value = id;
}

export function clearActiveToolMenu(id) {
  if (!id || toolMenuId.value === id) {
    toolMenuId.value = null;
  }
}
