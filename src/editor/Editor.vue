<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import Card from "../card/Card.vue";
import { state, updateState } from "../store";
import TextEditor from "../text_editor/TextEditor.vue";
import HoverTools from "../hover_tools/HoverTools.vue";

const activeSlide = ref<string | null>(null);
const activeContentIndex = ref<number | null>(null);

async function setActive(slideName: string, index: number) {
  activeSlide.value = slideName;
  activeContentIndex.value = index;

  await nextTick(); // wait until editor renders

  editorRef.value?.selectAll();
}

const editorRef = ref<any>(null);

const activeText = computed({
  get() {
    if (!activeSlide.value) return "";

    const slide = state.value.find((s) => s.name === activeSlide.value);

    if (!slide || activeContentIndex.value === null) return "";

    return slide.contents[activeContentIndex.value].text;
  },
  set(value: string) {
    if (!activeSlide.value) return;

    const slide = state.value.find((s) => s.name === activeSlide.value);

    if (!slide || activeContentIndex.value === null) return;

    slide.contents[activeContentIndex.value].text = value;
  },
});

function isActive(slideName: string, index: number) {
  return activeSlide.value === slideName && activeContentIndex.value === index;
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
        v-for="(content, index) in card.contents"
        :key="index"
        @click="setActive(card.name, index)"
      >
        <template v-if="isActive(card.name, index)">
          <TextEditor v-model="activeText" :ref="(el) => (editorRef = el)" />
        </template>

        <template v-else>
          <div v-html="content.text"></div>
        </template>
      </HoverTools>
    </Card>
  </div>

  activeSlide={{ activeSlide }} <br />
  activeText={{ activeText }}
</template>
