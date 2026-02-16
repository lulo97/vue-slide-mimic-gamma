<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import Card from "../card/Card.vue";
import { state } from "../stores/store";
import TextEditor from "../text_editor/TextEditor.vue";
import draggable from "vuedraggable";
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
      >
        <template #item="{ element }">
          <TextEditor v-model="element.content" />
        </template>
      </draggable>
    </Card>
  </div>
</template>
