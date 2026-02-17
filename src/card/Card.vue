<template>
  <div
    class="relative rounded-md border border-[#DFB679] overflow-hidden"
    :style="`width: ${CARD_SETTING.WIDTH}px; height: ${CARD_SETTING.HEIGHT}px`"
  >
    <div
      class="absolute w-full h-full bg-gradient-to-br from-red-200 via-yellow-200 to-green-200 opacity-30 blur-3xl"
    ></div>

    <div
      ref="layoutBtn"
      name="layout_setting"
      @click="openPopup"
      class="absolute top-3 left-3 bg-white z-[9999] w-[40px] h-[25px] rounded-md border border-gray-400 flex justify-center items-center gap-1 cursor-pointer"
    >
      <img style="width: 15px; height: 12px" src="/svg/card_layout.svg" />
      <img style="width: 11.25px; height: 9px" src="/svg/arrow_down.svg" />
    </div>

    <div :class="containerClass" class="w-full h-full relative">
      <!-- IMAGE -->
      <template v-if="!!props.image_url">
        <img
          v-if="props.layout !== 'background'"
          :class="[imageClass, clipClass]"
          :src="props.image_url"
        />

        <!-- Background mode -->
        <img v-else :class="imageClass" :src="props.image_url" />
      </template>

      <!-- CONTENT -->
      <div
        v-if="props.layout !== 'background'"
        class="ml-[0px] pt-[10px] flex-1 h-[60%] box-border"
      >
        <slot></slot>
      </div>

      <div v-else class="ml-[12px] relative z-10 w-full h-full">
        <slot></slot>
      </div>
    </div>
  </div>

  <Popup v-model="show" :x="popupX" :y="popupY">
    <LayoutSetting :name="props.name"></LayoutSetting>
  </Popup>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
import Popup from "../popup/Popup.vue";
import LayoutSetting from "./LayoutSetting.vue";
import { CARD_SETTING } from "./setting";

const show = ref(false);
const layoutBtn = ref(null);

const popupX = ref(0);
const popupY = ref(0);

const openPopup = async () => {
  await nextTick();

  const rect = layoutBtn.value.getBoundingClientRect();

  popupX.value = rect.left;
  popupY.value = rect.bottom + 8; // 8px gap below button

  show.value = true;
};

const props = defineProps({
  name: String,
  layout: String, //top, right, bottom, no-layout, background
  image_url: String,
});

const containerClass = computed(() => {
  switch (props.layout) {
    case "left":
      return "flex flex-row";
    case "right":
      return "flex flex-row-reverse";
    case "top":
      return "flex flex-col";
    case "bottom":
      return "flex flex-col-reverse";
    default:
      return "";
  }
});

const imageClass = computed(() => {
  switch (props.layout) {
    case "left":
    case "right":
      return "h-full w-auto object-contain shrink-0";

    case "top":
      return "w-full h-[40%] object-cover shrink-0";
    case "bottom":
      return "w-full h-auto object-contain shrink-0";

    case "background":
      return "absolute inset-0 w-full h-full object-cover";
    case "none":
      return "hidden";
    default: // no-layout
      return "w-full h-full object-contain";
  }
});

const clipClass = computed(() => {
  switch (props.layout) {
    case "top":
      return "clip-bottom";

    case "left":
      return "clip-right";

    case "right":
      return "clip-left";

    default:
      return "";
  }
});
</script>

<style>
.clip-bottom {
  clip-path: ellipse(100% 80% at 50% 20%);
}

.clip-right {
  clip-path: ellipse(80% 100% at 20% 50%);
}

.clip-left {
  clip-path: ellipse(80% 100% at 80% 50%);
}
</style>
