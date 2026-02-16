<template>
  <div class="flex justify-between items-center gap-2">
    <div
      v-for="item in layouts"
      :key="item.value"
      @click="select(item.value)"
      class="rounded-3xl px-[10px] py-[6px] w-fit h-fit cursor-pointer transition"
      :class="
        currentSlide.layout === item.value
          ? 'border border-teal-500'
          : 'border border-gray-300'
      "
    >
      <div
        class="w-[28px] h-[20px] border-2 rounded-sm overflow-hidden flex"
        :class="
          currentSlide.layout === item.value
            ? 'border-teal-500'
            : 'border-gray-300'
        "
        :style="item.containerStyle"
      >
        <div
          v-if="item.inner"
          :style="item.innerStyle"
          :class="
            currentSlide.layout === item.value ? 'bg-teal-500' : 'bg-gray-300'
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { state, updateState } from "../stores/store";

const props = defineProps({
  name: String,
});

const currentSlide = computed(() => {
  return state.value.find((ele) => ele.name == props.name);
});

const select = (value) => {
  updateState(props.name, "layout", value);
};

const layouts = [
  {
    value: "none",
  },
  {
    value: "top",
    inner: true,
    innerStyle: "width:100%; height:8px;",
  },
  {
    value: "left",
    inner: true,
    containerStyle: "justify-content:flex-start;",
    innerStyle: "width:8px; height:100%;",
  },
  {
    value: "right",
    inner: true,
    containerStyle: "justify-content:flex-end;",
    innerStyle: "width:8px; height:100%;",
  },
  {
    value: "background",
    inner: true,
    innerStyle: "width:100%; height:100%;",
  },
];
</script>
