<template>
  <div class="relative group" @click="$emit('click')">
    <!-- 3-dot button -->
    <div
      class="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    >
      <button
        class="bg-white hover:bg-gray-200 text-xs px-2 py-1 rounded shadow"
        @click.stop="handleClick"
      >
        ⋮
      </button>
    </div>

    <!-- Content wrapper (important for layout stability) -->
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["click"]);

function handleClick() {
  emit("click");
}
</script>
