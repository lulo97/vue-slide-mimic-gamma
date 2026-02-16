<template>
  <div
    class="relative border border-gray-500 pt-[10px]"
    @mouseenter="handleColumnHover('enter')"
    @mouseleave="handleColumnHover('leave')"
  >
    <div
      v-if="showColumnButton"
      class="drag-handle absolute top-[-6px] left-1/2 -translate-x-1/2 px-4 pb-2 bg-white hover:bg-gray-500 flex items-center justify-center cursor-pointer border border-gray-700 rounded-sm w-fit h-[12px]"
      @click="handleShowColumnButtonClick"
    >
      …
    </div>

    <TextEditor
      :isHideMenu="true"
      :modelValue="title"
      @update:modelValue="(val) => emit('update:title', val)"
    />

    <TextEditor
      :isHideMenu="true"
      :modelValue="content"
      @update:modelValue="(val) => emit('update:content', val)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextEditor from "../text_editor/TextEditor.vue";

const props = defineProps({
  title: Object,
  content: Object,
});

const emit = defineEmits(["update:title", "update:content"]);

const showColumnButton = ref(false);

function handleColumnHover(type) {
  if (type === "enter") {
    showColumnButton.value = true;
  }

  if (type === "leave") {
    showColumnButton.value = false;
  }
}

function handleShowColumnButtonClick() {}
</script>
