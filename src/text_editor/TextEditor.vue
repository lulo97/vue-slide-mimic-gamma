<template>
  <div ref="editorWrapperRef" class="">
    <!-- w-full not fix bubble menu recaculate position -->
    <div
      :class="`relative ${props.isHideMenu ? '' : PADDING_X} w-full h-fit`"
      @mouseenter="handleEditorHover('enter')"
      @mouseleave="handleEditorHover('leave')"
    >
      <ToolMenu
        :editor="editor"
        :show="showToolMenu"
        :position="{
          top: showToolMenuPosition.top,
          left: showToolMenuPosition.left,
        }"
      />

      <div
        ref="showToolButtonRef"
        v-if="showToolButton && !props.isHideMenu"
        :class="`drag-handle absolute top-1/2 -translate-y-1/2 left-[${TEXT_EDITOR_BUBBLE_LEFT}px] bg-white hover:bg-gray-500 px-[3px] h-fit flex justify-center items-center cursor-pointer border-gray-700 border rounded-sm`"
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
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { ref, onBeforeUnmount, onMounted, computed, nextTick } from "vue";
import { FontSize } from "@tiptap/extension-text-style/font-size";
import { FontFamily } from "@tiptap/extension-text-style/font-family";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TITLE_STYLE, CONTENT_STYLE } from "./utils";
import { PADDING_X, TEXT_EDITOR_BUBBLE_LEFT } from "../card/setting";
import ToolMenu from "./ToolMenu.vue";
import {
  clearActiveToolMenu,
  setActiveToolMenu,
  toolMenuId,
} from "../stores/bubbleMenuStore";
import { useId } from "vue";

const id = useId();

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: (element) => element.style.fontFamily,
        renderHTML: (attributes) => {
          if (!attributes.fontFamily) return {};
          return { style: `font-family: ${attributes.fontFamily}` };
        },
      },
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
      fontWeight: {
        default: null,
        parseHTML: (element) => element.style.fontWeight,
        renderHTML: (attributes) => {
          if (!attributes.fontWeight) return {};
          return { style: `font-weight: ${attributes.fontWeight}` };
        },
      },
    };
  },
});

/* ---------------------------
   Props
---------------------------- */

const props = defineProps({
  modelValue: Object,
  isHideMenu: Boolean | undefined,
  placeholder: {
    type: String,
    default: "Write something...",
  },
  defaultTextStyle: Object | undefined,
  isTitle: Boolean | undefined,
});

/* ---------------------------
   Editor
---------------------------- */

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  extensions: [
    StarterKit,
    CustomTextStyle,
    Color,
    FontSize.configure({
      types: ["textStyle"],
    }),
    FontFamily.configure({
      types: ["textStyle"],
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
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
  onCreate({ editor }) {
    if (editor.isEmpty && props.defaultTextStyle) {
      editor.commands.setMark("textStyle", props.defaultTextStyle);
    }
  },
  onSelectionUpdate({ editor }) {
    const { from, to, empty } = editor.state.selection;

    if (empty) {
      clearActiveToolMenu(id);
      return;
    }

    const start = editor.view.coordsAtPos(from);
    const end = editor.view.coordsAtPos(to);

    showToolMenuPosition.value = {
      top: start.top - 40,
      left: (start.left + end.right) / 2,
    };

    setActiveToolMenu(id);
  },
});

const showToolMenuPosition = ref({
  top: 0,
  left: 0,
});
const showToolMenu = computed(() => toolMenuId.value === id);

async function handleShowToolButtonClick() {
  if (!editor.value) return;

  editor.value.chain().focus().selectAll().run();

  //showToolMenu.value = true;

  // const { from, to } = editor.value.state.selection;
  // const start = editor.value.view.coordsAtPos(from);
  // const end = editor.value.view.coordsAtPos(to);

  // const centerX = (start.left + end.right) / 2;

  // showToolMenuPosition.value = {
  //   top: start.top - 40,
  //   left: centerX,
  // };
}

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
  editor.value.chain().focus().setFontFamily(TITLE_STYLE.fontFamily).run();
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const editorWrapperRef = ref(null);

import { onClickOutside } from "@vueuse/core";

onClickOutside(editorWrapperRef, () => {
  if (toolMenuId.value === id) {
    clearActiveToolMenu(id);
  }
});
</script>
