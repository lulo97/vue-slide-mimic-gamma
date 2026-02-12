<script setup lang="ts">
import { ref, onMounted } from "vue";
import Card from "../card/Card.vue";
import { state, updateState } from "../store";
import TextEditor from "../text_editor/TextEditor.vue";
import HoverTools from "../hover_tools/HoverTools.vue";
import GridWrapper from "../grid_wrapper/GridWrapper.vue";
import draggable from "vuedraggable";

const editorRefs = ref({});

function handleHoverClick(cardName: string) {
  editorRefs.value[cardName]?.selectAll();
}

onMounted(() => {
  updateState("layout", "left");
});
</script>

<template>
  <div class="flex items-center justify-center">
    <Card
      v-for="card in state"
      :name="card.name"
      :layout="card.layout"
      :image_url="card.image_url"
    >
      <HoverTools
        v-for="content in card.contents"
        @click="handleHoverClick(card.name)"
      >
        <TextEditor
          :ref="(el) => (editorRefs[card.name] = el)"
          v-model="content.text"
        ></TextEditor>
      </HoverTools>
    </Card>
  </div>
</template>
