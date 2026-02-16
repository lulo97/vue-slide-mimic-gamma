<template>
  <div
    class="relative bg-white border border-[#DFB679] p-[18px] rounded-md flex-1 flex flex-col"
    @mouseenter="handleColumnHover('enter')"
    @mouseleave="handleColumnHover('leave')"
  >
    <div
      v-show="showColumnButton"
      ref="columnButtonRef"
      class="drag-handle absolute top-[-6px] left-1/2 -translate-x-1/2 px-2 pb-2 bg-white hover:bg-gray-200 flex items-center justify-center cursor-pointer border border-gray-700 rounded-sm w-fit h-[12px]"
      @click="handleShowColumnButtonClick"
    >
      …
    </div>

    <Popover
      ref="popupColumnToolRef"
      :show="showPopover"
      :position="popoverPosition"
    >
      <template #content>
        <div class="flex gap-1 px-2 py-1">
          <div
            class="cursor-pointer hover:bg-cyan-200 p-1 rounded-md"
            @click="handleModifyColumns(index, 'add_before')"
          >
            <img
              style="width: 12.25px; height: 14px"
              src="/svg/add_column_before.svg"
            />
          </div>
          <div
            class="cursor-pointer hover:bg-cyan-200 p-1 rounded-md"
            @click="handleModifyColumns(index, 'add_after')"
          >
            <img
              style="width: 12.25px; height: 14px"
              src="/svg/add_column_after.svg"
            />
          </div>

          <div
            class="cursor-pointer hover:bg-cyan-200 p-1 rounded-md"
            @click="handleModifyColumns(index, 'delete')"
          >
            <img
              class="fill-[#a52f2f]"
              style="width: 12.25px; height: 14px"
              src="/svg/trash.svg"
            />
          </div>
        </div>
      </template>
    </Popover>

    <TextEditor
      class="mb-4"
      :isHideMenu="true"
      :modelValue="title"
      @update:modelValue="(val) => emit('update:title', val)"
      :defaultTextStyle="TITLE_STYLE"
      :isTitle="true"
      :class="'title-editor'"
    />

    <TextEditor
      :isHideMenu="true"
      :modelValue="content"
      @update:modelValue="(val) => emit('update:content', val)"
      :defaultTextStyle="CONTENT_STYLE"
      :class="'content-editor'"
    />
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import TextEditor from "../text_editor/TextEditor.vue";
import Popover from "../popover/PopOver.vue";
import { CONTENT_STYLE, TITLE_STYLE } from "./data";

const props = defineProps({
  title: Object,
  content: Object,
  index: Number,
});

const emit = defineEmits([
  "update:title",
  "update:content",
  "handleModifyColumns",
]);

const showColumnButton = ref(false);
const showPopover = ref(false);

function handleColumnHover(type) {
  if (type === "enter") {
    showColumnButton.value = true;
  }

  if (type === "leave") {
    if (showPopover.value == true && showColumnButton.value == true) return;
    showColumnButton.value = false;
  }
}

const columnButtonRef = ref(null);
const popupColumnToolRef = ref(null);
const popoverPosition = ref({ top: 0, left: 0 });

function handleShowColumnButtonClick() {
  nextTick(() => {
    const rect = columnButtonRef.value.getBoundingClientRect();

    popoverPosition.value = {
      top: rect.bottom, // 8px gap
      left: rect.left + rect.width / 2,
    };

    showPopover.value = true;
  });
}

function handleGlobalClick(e) {
  if (!showPopover.value) return;

  const buttonEl = columnButtonRef.value;
  const popoverEl = popupColumnToolRef.value?.popover;

  const clickedInsideButton = buttonEl && buttonEl.contains(e.target);

  const clickedInsidePopover = popoverEl && popoverEl.contains(e.target);

  if (!clickedInsideButton && !clickedInsidePopover) {
    showPopover.value = false;
    showColumnButton.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleGlobalClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleGlobalClick);
});

function handleModifyColumns(index, action) {
  emit("handleModifyColumns", index, action);
  showPopover.value = false;
  showColumnButton.value = false;
}
</script>
