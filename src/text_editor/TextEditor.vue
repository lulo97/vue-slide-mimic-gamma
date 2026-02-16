<template>
  <div class="">
    <!-- z-index to prevent bubblemenu under another editor -->
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      class="z-[9999] bg-white border border-gray-200 rounded-lg px-2 py-2 shadow-md flex gap-2"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
      >
        <img style="width: 17.5px; height: 14px" src="/svg/bold.svg" />
      </button>

      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
      >
        <img style="width: 17.5px; height: 14px" src="/svg/italic.svg" />
      </button>
    </BubbleMenu>

    <!-- w-full not fix bubble menu recaculate position -->
    <div
      :class="`relative ${props.isHideMenu ? '' : 'pl-[30px]'} w-full h-fit`"
      @mouseenter="handleEditorHover('enter')"
      @mouseleave="handleEditorHover('leave')"
    >
      <div
        v-if="showToolButton && !props.isHideMenu"
        :class="`drag-handle absolute top-0 left-[10px] bg-white hover:bg-gray-500 px-[3px] h-fit flex justify-center items-center cursor-pointer border-gray-700 border rounded-sm`"
        @click="handleShowToolButtonClick"
      >
        ⋮
      </div>

      <EditorContent
        :editor="editor"
        class="inline-block [&_.ProseMirror]:inline-block"
      />
    </div>
  </div>
</template>

<script setup>
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { ref, onBeforeUnmount, onMounted } from "vue";
import { FontSize } from "@tiptap/extension-text-style/font-size";
import { FontFamily } from "@tiptap/extension-text-style/font-family";

import {
  activeEditorId,
  openBubble,
  closeBubble,
} from "../stores/bubbleMenuStore";

/* ---------------------------
   Unique ID per instance
---------------------------- */

const editorId = Symbol("editor");

/* ---------------------------
   Props
---------------------------- */

const props = defineProps({
  modelValue: Object,
  isHideMenu: Boolean | undefined,
});

/* ---------------------------
   Editor
---------------------------- */

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  extensions: [
    StarterKit,
    TextStyle,
    FontSize.configure({
      types: ["textStyle"],
    }),
    FontFamily.configure({
      types: ["textStyle"],
    }),
  ],
  content: props.modelValue, // JSON now
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getJSON());
  },
  // Prevent drag and drop tiptap
  editorProps: {
    handleDOMEvents: {
      dragstart: () => true,
      dragover: (view, event) => {
        event.preventDefault();
        return true;
      },
      drop: (view, event) => {
        event.preventDefault();
        return true;
      },
    },
  },
});

function handleShowToolButtonClick() {
  if (!editor.value) return;

  openBubble(editorId);

  editor.value.chain().focus().selectAll().run();
}

/* ---------------------------
   Hover logic
---------------------------- */

const showToolButton = ref(false);

function handleEditorHover(type) {
  if (type === "enter") {
    showToolButton.value = true;
  }

  if (type === "leave") {
    showToolButton.value = false;
  }
}

onMounted(() => {
  // editor.value.chain().focus().setFontSize("29.7px").run();
  editor.value.chain().focus().setFontFamily("Bricolage Grotesque").run();
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }

  // Clean up if this editor was active
  closeBubble(editorId);
});
</script>
