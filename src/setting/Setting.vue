<template>
  <div class="p-10">
    <draggable
      v-model="columns"
      item-key="id"
      direction="horizontal"
      class="flex"
      handle=".drag-handle"
    >
      <template #item="{ element }">
        <Column :title="element.title" :content="element.content" />
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import Column from "./Column.vue";

function _format(text) {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      },
    ],
  };
}

const columns = ref([
  { id: 1, title: _format("Column 1"), content: _format("Fake content A") },
  { id: 2, title: _format("Column 2"), content: _format("Fake content B") },
]);
</script>

<style></style>
