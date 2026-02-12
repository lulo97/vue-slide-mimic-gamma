import { ref } from "vue";

const state = ref([
  {
    name: "slide1",
    layout: "left",
    image_url: "/slide1_background.png",
    contents: [
      {
        level: 1,
        text: '<p><span style="font-size:32px;font-weight:700;">Poisonous Plants in Vietnam</span></p>',
      },
      {
        level: 2,
        text: "<p>Hidden dangers of the rainforest — beautiful, common, sometimes deadly.</p>",
      },
    ],
  },
]);

function updateState(slide_name, key, value) {
  const current_slide = state.value.find((ele) => ele.name == slide_name);
  if (current_slide) {
    current_slide[key] = value;
  }
}

export { state, updateState };
