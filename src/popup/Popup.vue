<template>
  <div v-if="modelValue" class="fixed inset-0 z-50" @click="close">
    <div
      ref="popupRef"
      class="absolute bg-white border border-gray-300 shadow-lg rounded-md p-4"
      :style="popupStyle"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: Boolean,
  width: {
    type: Number,
    default: null,
  },
  height: {
    type: Number,
    default: null,
  },
  x: Number,
  y: Number,
});

const emit = defineEmits(["update:modelValue"]);

const popupRef = ref(null);

const popupStyle = computed(() => {
  const style = {
    left: props.x + "px",
    top: props.y + "px",
  };

  if (props.width) {
    style.width = props.width + "px";
  }

  if (props.height) {
    style.height = props.height + "px";
  }

  return style;
});

const close = () => {
  emit("update:modelValue", false);
};
</script>
