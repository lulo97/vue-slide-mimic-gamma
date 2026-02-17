import {
  TITLE_STYLE,
  TITLE_COLUMN_STYLE,
  CONTENT_STYLE,
} from "../text_editor/utils";

const slide1 = {
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
};

/*
Top Poisonous Plants to Watch

Han Tree — Dendrocnide urentissima

Needle-like hairs → intense burning, swelling; visible on leaf surface

Gelsemium elegans — Heartbreak Grass

All parts highly toxic → respiratory failure; linked to fatal cases

Strychnos nux-vomica — Strychnine Tree

Poisonous seeds (strychnine) → severe convulsions, possible death

Wax Tree — Rhus succedanea

Resin causes allergic reactions, skin ulcers; hazardous when inhaled

Small differences matter — look for hairs, bright flowers, berries, or resin.
*/

const slide2 = {
  name: "slide2",
  layout: "top",
  image_url: "",
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
                text: "Top Poisonous Plants to Watch",
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
        type: "columns",
        variant: "none",
        content: [
          {
            id: "0cc4622b-4405-46cb-ae42-80798b25f002",
            title: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Han Tree — Dendrocnide urentissima",
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
                      text: "Needle-like hairs → intense burning, swelling; visible on leaf surface",
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
            id: "84d73c2b-1036-41b5-8dcb-4a6be7b2188f",
            title: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Gelsemium elegans — Heartbreak Grass",
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
                      text: "All parts highly toxic → respiratory failure; linked to fatal cases",
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
};

export const DATA = [slide1, slide2];
