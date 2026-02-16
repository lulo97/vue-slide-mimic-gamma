<template>
  <div class="p-10 w-full">
    <draggable
      v-model="columns"
      item-key="id"
      direction="horizontal"
      class="flex gap-4"
      handle=".drag-handle"
    >
      <template #item="{ element, index }">
        <ColumnItem
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
import { computed } from "vue";
import draggable from "vuedraggable";
import ColumnItem from "./ColumnItem.vue";
import { EMPTY_ROW } from "./data";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

/* ✅ Proper v-model bridge */
const columns = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/* Optional: update nested values safely */
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
