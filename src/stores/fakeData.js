import {
  TITLE_STYLE,
  TITLE_COLUMN_STYLE,
  CONTENT_STYLE,
} from "../text_editor/utils";

export const DATA = [
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
                    {
                      type: "textStyle",
                      attrs: TITLE_STYLE,
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
                      attrs: CONTENT_STYLE,
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
                            type: "textStyle",
                            attrs: TITLE_COLUMN_STYLE,
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
                            attrs: CONTENT_STYLE,
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
                            type: "textStyle",
                            attrs: TITLE_COLUMN_STYLE,
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
                            attrs: CONTENT_STYLE,
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
                            type: "textStyle",
                            attrs: TITLE_COLUMN_STYLE,
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
                            attrs: CONTENT_STYLE,
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
];
