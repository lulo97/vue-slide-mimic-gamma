<template>
  <div class="editor-container">
    <BubbleMenu v-if="editor" :editor="editor" :should-show="shouldShow">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
      >
        Bold
      </button>

      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
      >
        Italic
      </button>

      <input type="color" @input="onColorInput" />
    </BubbleMenu>

    <div
      class="relative ml-[100px]"
      @mouseenter="handleEditorHover('enter')"
      @mouseleave="handleEditorHover('leave')"
    >
      <div
        v-if="showToolButton"
        draggable="true"
        class="absolute top-0 left-[-24px] bg-gray-400 px-2 h-full flex justify-center items-center cursor-pointer border-gray-700 border rounded-xl"
        @click="handleShowToolButtonClick"
      >
        :
      </div>

      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { ref, onBeforeUnmount } from "vue";

const showToolButton = ref(false);
const forceShow = ref(false);

const editor = useEditor({
  extensions: [StarterKit, TextStyle, Color],
  content: `<p>Select some text to see the bubble menu.</p>`,
});

/* ---------------------------
   BubbleMenu visibility logic
---------------------------- */

function shouldShow({ editor }) {
  if (!editor) return false;

  // If forced → always show (as long as editor focused)
  if (forceShow.value) return true;

  // Default behaviour → show only when selection exists
  return editor.state.selection.from !== editor.state.selection.to;
}

function handleShowToolButtonClick() {
  if (!editor.value) return;

  editor.value.commands.focus();
  forceShow.value = true;
}

/* ---------------------------
   Color input
---------------------------- */

function onColorInput(e) {
  editor.value.chain().focus().setColor(e.target.value).run();
}

/* ---------------------------
   Hover logic (stable)
---------------------------- */

let hideTimeout = null;
const delay = 600;

function handleEditorHover(type) {
  if (type === "enter") {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    showToolButton.value = true;
  }

  if (type === "leave") {
    hideTimeout = setTimeout(() => {
      showToolButton.value = false;
    }, delay);
  }
}

/* ---------------------------
   Cleanup
---------------------------- */

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
