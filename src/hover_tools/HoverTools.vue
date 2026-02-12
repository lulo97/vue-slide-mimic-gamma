<template>
  <div
    class="relative inline-block"
    @mouseenter="isVisible = true"
    @mouseleave="isVisible = false"
  >
    <!-- Invisible hover extension area -->
    <div class="absolute -left-8 top-0 bottom-0 w-8"></div>

    <!-- Tool Button -->
    <div
      class="absolute -left-8 top-1/2 -translate-y-1/2 transition-opacity duration-150"
      :class="isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <button
        class="bg-white hover:bg-gray-300 text-xs px-2 py-1 rounded shadow"
        @click.stop="handleClick"
      >
        ⋮
      </button>
    </div>

    <!-- Content -->
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["click"]);
const isVisible = ref(false);

function handleClick() {
  emit("click");
}
</script>
