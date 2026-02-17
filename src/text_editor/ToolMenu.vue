<template>
  <!-- z-index to prevent bubblemenu under another editor -->
  <Popover :show="show" :position="position">
    <template #content>
      <div class="flex shadow-md">
        <button
          @click="toggleFontWeight"
          :class="'hover:bg-cyan-200 rounded-md px-2'"
        >
          <img style="width: 17.5px; height: 14px" src="/svg/bold.svg" />
        </button>

        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="'hover:bg-cyan-200 rounded-md px-2'"
        >
          <img style="width: 17.5px; height: 14px" src="/svg/italic.svg" />
        </button>

        <button
          :class="'hover:bg-cyan-200 rounded-md px-2 flex item-center justify-center py-1'"
        >
          <ColorSelector :editor="editor" @applyColor="applyColor" />
        </button>
      </div>
    </template>
  </Popover>
</template>
<script setup>
import Popover from "../popover/Popover.vue";
import ColorSelector from "./ColorSelector.vue";
import { CONTENT_STYLE, TITLE_STYLE } from "./utils";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  position: {
    type: Object,
    required: true,
  },
  editor: Object,
});

const toggleFontWeight = () => {
  const isActive = props.editor.isActive("textStyle", {
    fontWeight: "600",
  });

  if (isActive) {
    props.editor
      .chain()
      .focus()
      .setMark("textStyle", { fontWeight: CONTENT_STYLE.fontWeight })
      .run();
  } else {
    props.editor
      .chain()
      .focus()
      .setMark("textStyle", { fontWeight: TITLE_STYLE.fontWeight })
      .run();
  }
};

function applyColor() {}
</script>
