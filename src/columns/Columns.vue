<template>
  <div
    id="columns"
    :class="`${PADDING_X} w-full relative  h-fit`"
    @mouseenter="handleColumnsHover('enter')"
    @mouseleave="handleColumnsHover('leave')"
  >
    <div
      v-if="showToolButton"
      :class="`drag-handle absolute top-0 left-[${TEXT_EDITOR_BUBBLE_LEFT}px] bg-white hover:bg-gray-500 px-[3px] h-fit flex justify-center items-center cursor-pointer border-gray-700 border rounded-sm`"
    >
      ⋮
    </div>

    <draggable
      v-model="columns"
      item-key="id"
      direction="horizontal"
      class="flex gap-4"
      handle=".drag-handle"
    >
      <template #item="{ element, index }">
        <ColumnItem
          :variant="variant"
          :title="element.title"
          :content="element.content"
          @update:title="(val) => updateTitle(index, val)"
          @update:content="(val) => updateContent(index, val)"
          :index="index"
          @handleModifyColumns="handleModifyColumns"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import ColumnItem from "./ColumnItem.vue";
import { EMPTY_ROW } from "./utils";
import { PADDING_X, TEXT_EDITOR_BUBBLE_LEFT } from "../card/setting";

const showToolButton = ref(false);

function handleColumnsHover(type) {
  if (type === "enter") {
    showToolButton.value = true;
  }

  if (type === "leave") {
    showToolButton.value = false;
  }
}

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  variant: String | undefined,
});

const emit = defineEmits(["update:modelValue"]);

const columns = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

function updateTitle(index, val) {
  const updated = [...props.modelValue];
  updated[index].title = val;
  emit("update:modelValue", updated);
}

function updateContent(index, val) {
  const updated = [...props.modelValue];
  updated[index].content = val;
  emit("update:modelValue", updated);
}

function handleModifyColumns(index, action) {
  const updated = [...props.modelValue];

  if (action === "add_after") {
    updated.splice(index + 1, 0, { ...EMPTY_ROW, id: crypto.randomUUID() });
  }

  if (action === "add_before") {
    updated.splice(index, 0, { ...EMPTY_ROW, id: crypto.randomUUID() });
  }

  if (action === "delete") {
    updated.splice(index, 1);
  }

  emit("update:modelValue", updated);
}
</script>
