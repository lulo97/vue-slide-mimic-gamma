<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import Card from "../card/Card.vue";
import { state } from "../stores/store";
import TextEditor from "../text_editor/TextEditor.vue";
import draggable from "vuedraggable";
import Columns from "../columns/Columns.vue";
</script>

<template>
  <div class="flex items-center justify-center gap-6">
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
        class="flex flex-col justify-between h-full py-8"
      >
        <template #item="{ element }">
          <div>
            <Columns
              v-if="element.data.type == 'columns'"
              v-model="element.data.content"
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
