<template>
  <div class="relative inline-block">
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-show="show"
        class="fixed z-50 w-fit rounded-md bg-white shadow-lg ring-1 ring-black/5"
        :style="{
          top: position.top + 'px',
          left: position.left + 'px',
          transform: 'translateX(-50%)',
        }"
        ref="popover"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
});

const popover = ref(null);

defineExpose({
  popover,
});
</script>
