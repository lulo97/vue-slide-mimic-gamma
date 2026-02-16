import { CONTENT_STYLE, TITLE_STYLE } from "../text_editor/utils";

function _formatHead(text) {
  return createDoc(text, [
    {
      type: "textStyle",
      attrs: TITLE_STYLE,
    },
  ]);
}

function _format(text) {
  return createDoc(text, [
    {
      type: "textStyle",
      attrs: CONTENT_STYLE,
    },
  ]);
}

function createDoc(text, marks = []) {
  if (!text) {
    return {
      type: "doc",
      content: [{ type: "paragraph" }],
    };
  }

  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text,
            marks,
          },
        ],
      },
    ],
  };
}

export const COLUMNS = [
  {
    id: crypto.randomUUID(),
    title: _formatHead("Where"),
    content: _format("Lowland to highland forests across Vietnam"),
  },
  {
    id: crypto.randomUUID(),
    title: _formatHead("Why"),
    content: _format("Plants evolved toxins for defense"),
  },
  {
    id: crypto.randomUUID(),
    title: _formatHead("Who' at risk"),
    content: _format("Trekkers, foragers, children, workers"),
  },
];

export const EMPTY_ROW = { title: _formatHead(""), content: _format("") };
