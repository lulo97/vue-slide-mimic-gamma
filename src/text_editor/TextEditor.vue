<template>
  <div class="relative">
    <!-- Floating Notion-style menu -->
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      class="flex items-center gap-2 bg-white shadow-xl rounded-xl p-2 border border-gray-200"
    >
      <!-- Text Style Select -->
      <select
        :value="currentTextType"
        class="text-sm border rounded-md px-2 py-1 bg-gray-50 z-100"
        @change="applyTextStyle($event.target.value)"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="small">Small Text</option>
        <option value="medium">Medium Text</option>
        <option value="large">Large Text</option>
      </select>

      <!-- Bold -->
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="buttonClass(editor.isActive('bold'))"
      >
        Bold
      </button>

      <!-- Italic -->
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="buttonClass(editor.isActive('italic'))"
      >
        Italic
      </button>

      <!-- Colors -->
      <button
        @click="setColor('red')"
        class="px-2 py-1 text-sm rounded-md bg-red-100 hover:bg-red-200"
      >
        Red
      </button>

      <button
        @click="setColor('blue')"
        class="px-2 py-1 text-sm rounded-md bg-blue-100 hover:bg-blue-200"
      >
        Blue
      </button>
    </BubbleMenu>

    <!-- Editor -->
    <EditorContent
      :editor="editor"
      class="focus:outline-none [&_.ProseMirror]:outline-none [&_p]:m-0"
    />
  </div>
</template>

<script setup>
import { watch } from "vue";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  getTextStyleAttributes,
  getButtonClass,
  shouldUpdateContent,
} from "./utils";
import { defineExpose } from "vue";
import { computed } from "vue";

const currentTextType = computed(() => {
  if (!editor.value) return "paragraph";

  const attrs = editor.value.getAttributes("textStyle");

  if (attrs.fontSize === "32px" && attrs.fontWeight === "700") {
    return "h1";
  }

  if (attrs.fontSize === "26px") return "h2";
  if (attrs.fontSize === "20px" && attrs.fontWeight === "600") return "h3";
  if (attrs.fontSize === "18px") return "h4";
  if (attrs.fontSize === "12px") return "small";
  if (attrs.fontSize === "16px") return "medium";
  if (attrs.fontSize === "20px" && attrs.fontWeight === "500") return "large";

  return "paragraph";
});

/* 👇 expose method to parent */
function selectAll() {
  if (!editor.value) return;

  editor.value.chain().focus().selectAll().run();
}

defineExpose({
  selectAll,
});

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
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

/* ✅ Props */
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

/* ✅ Emit */
const emit = defineEmits(["update:modelValue"]);

/* ✅ Editor */
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false, // disable real headings
    }),
    CustomTextStyle,
    Color.configure({ types: ["textStyle"] }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

/* ✅ Sync when parent updates value */
watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return;

    const current = editor.value.getHTML();

    if (shouldUpdateContent(current, value)) {
      editor.value.commands.setContent(value, false);
    }
  },
);

const setColor = (color) => {
  editor.value.chain().focus().setColor(color).run();
};

const buttonClass = (active) => getButtonClass(active);

function applyTextStyle(type) {
  if (!editor.value) return;

  const attrs = getTextStyleAttributes(type);
  const chain = editor.value.chain().focus();

  if (!attrs) {
    chain.unsetMark("textStyle").run();
  } else {
    chain.setMark("textStyle", attrs).run();
  }
}
</script>
