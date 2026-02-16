import { ref } from "vue";

const state = ref([
  {
    name: "slide1",
    layout: "top",
    image_url: "/slide1_background.png",
    contents: [
      {
        id: 1,
        level: 1,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    { type: "bold" },
                    {
                      type: "textStyle",
                      attrs: {
                        fontFamily: "Bricolage Grotesque",
                        fontSize: "29.7px",
                        fontWeight: "600",
                      },
                    },
                  ],
                  text: "Poisonous Plants in Vietnam",
                },
              ],
            },
          ],
        },
      },
      {
        id: 2,
        level: 2,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Hidden dangers of the rainforest — beautiful, common, sometimes deadly.",
                  marks: [
                    {
                      type: "textStyle",
                      attrs: {
                        fontFamily: "Inter",
                        fontSize: "13.5px",
                        fontWeight: "400",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
]);

function updateState(slideName, key, value) {
  const slide = state.value.find((s) => s.name === slideName);
  if (slide) {
    slide[key] = value;
  }
}

export { state, updateState };
