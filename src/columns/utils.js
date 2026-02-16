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

export const EMPTY_ROW = { title: _formatHead(""), content: _format("") };
