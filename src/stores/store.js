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
        data: {
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
                        fontSize: "45px",
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
        data: {
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
                        fontSize: "18px",
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
      {
        id: 3,
        level: 3,
        data: {
          type: "columns",
          content: [
            {
              id: "0cc4622b-4405-46cb-ae42-80798b25f001",
              title: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Where",
                        marks: [
                          {
                            type: "bold",
                          },
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Bricolage Grotesque",
                              fontSize: "22.5px",
                              fontWeight: "600",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              content: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Lowland to highland forests across Vietnam",
                        marks: [
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Inter",
                              fontSize: "18px",
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
            {
              id: "84d73c2b-1036-41b5-8dcb-4a6be7b2199f",
              title: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Why",
                        marks: [
                          {
                            type: "bold",
                          },
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Bricolage Grotesque",
                              fontSize: "22.5px",
                              fontWeight: "600",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              content: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Plants evolved toxins for defense",
                        marks: [
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Inter",
                              fontSize: "18px",
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
            {
              id: "63c44dbb-f1f2-4a12-9bed-69347cf6e473",
              title: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Who' at risk",
                        marks: [
                          {
                            type: "bold",
                          },
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Bricolage Grotesque",
                              fontSize: "22.5px",
                              fontWeight: "600",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              content: {
                type: "doc",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Trekkers, foragers, children, workers",
                        marks: [
                          {
                            type: "textStyle",
                            attrs: {
                              fontFamily: "Inter",
                              fontSize: "18px",
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
