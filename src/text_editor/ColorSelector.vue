<script setup>
import { ref, nextTick } from "vue";
import Popover from "../popover/Popover.vue";

const emit = defineEmits(["applyColor"]);

const props = defineProps({
  editor: Object,
});

const show = ref(false);
const buttonRef = ref(null);

const position = ref({
  top: 0,
  left: 0,
});

const selectedColor = ref("#ef4444");

function togglePopover(event) {
  event.stopPropagation();
  event.preventDefault();

  show.value = !show.value;

  if (show.value) {
    nextTick(() => {
      const rect = buttonRef.value.getBoundingClientRect();
      position.value = {
        top: rect.bottom + 6,
        left: rect.left + rect.width / 2,
      };
    });
  }
}

function applyColor(color) {
  if (!props.editor) return;

  selectedColor.value = color;

  //Uncaught TypeError: props.editor.chain(...).focus(...).setColor is not a function
  props.editor.chain().focus().setColor(color).run();

  show.value = false;

  emit("applyColor");
}
</script>

<template>
  <div class="relative bg-red-200">
    <!-- Button -->
    <button
      @click="togglePopover"
      ref="buttonRef"
      type="button"
      class="inline-flex items-center justify-center select-none"
      @mousedown.prevent
    >
      <div class="flex flex-col justify-center items-center gap-[2px]">
        <img style="width: 10.7px; height: 12.25px" src="/svg/letter_a.svg" />
        <div
          class="flex w-5 h-1.5 rounded-sm border border-black/40"
          :style="{ background: selectedColor }"
        ></div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="w-2.5 h-2.5 fill-current ml-[2px]"
      >
        <path
          d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"
        />
      </svg>
    </button>

    <!-- Popover -->
    <Popover :show="show" :position="position">
      <template #content>
        <div class="flex gap-2 p-2" @mousedown.prevent @click.stop>
          <button
            class="w-5 h-5 rounded-full bg-red-500"
            @click="applyColor('#ef4444')"
          />
          <button
            class="w-5 h-5 rounded-full bg-blue-500"
            @click="applyColor('#3b82f6')"
          />
          <button
            class="w-5 h-5 rounded-full bg-green-500"
            @click="applyColor('#22c55e')"
          />
          <button
            class="w-5 h-5 rounded-full bg-black"
            @click="applyColor('#000000')"
          />
        </div>
      </template>
    </Popover>
  </div>
</template>
