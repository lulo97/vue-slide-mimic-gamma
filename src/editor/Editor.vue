<script setup lang="ts">
import Card from "../card/Card.vue";
import { state } from "../stores/store";
import TextEditor from "../text_editor/TextEditor.vue";
import draggable from "vuedraggable";
import Columns from "../columns/Columns.vue";

const getJustify = (layout: string) => {
  console.log(layout);
  if (["background", "none", "left", "right"].includes(layout)) {
    return "justify-center gap-12";
  }
  return "justify-between";
};
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <Card
      v-for="card in state"
      :key="card.name"
      :name="card.name"
      :layout="card.layout"
      :image_url="card.image_url"
    >
      <draggable
        v-model="card.contents"
        item-key="id"
        handle=".drag-handle"
        animation="200"
        :class="`flex flex-col ${getJustify(card.layout)} h-full py-8`"
      >
        <template #item="{ element }">
          <div>
            <Columns
              v-if="element.data.type == 'columns'"
              v-model="element.data.content"
              :variant="element.data.variant"
            />
            <TextEditor
              v-if="element.data.type == 'doc'"
              v-model="element.data"
              :style="{
                marginBottom: element.marginBottom
                  ? element.marginBottom + 'px'
                  : undefined,
              }"
            />
          </div>
        </template>
      </draggable>
    </Card>
  </div>
</template>
