function _formatHead(text) {
  return createDoc(text, [
    { type: "bold" },
    {
      type: "textStyle",
      attrs: {
        fontFamily: "Bricolage Grotesque",
        fontSize: "22.5px",
        fontWeight: "600",
      },
    },
  ]);
}

function _format(text) {
  return createDoc(text, [
    {
      type: "textStyle",
      attrs: {
        fontFamily: "Inter",
        fontSize: "18px",
        fontWeight: "400",
      },
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
    title: _formatHead("Column 1"),
    content: _format("Fake content A"),
  },
  {
    id: crypto.randomUUID(),
    title: _formatHead("Column 2"),
    content: _format("Fake content B"),
  },
];

export const EMPTY_ROW = { title: _formatHead(""), content: _format("") };

export const TITLE_STYLE = {
  fontFamily: "Bricolage Grotesque",
  fontSize: "22.5px",
  fontWeight: "600",
};

export const CONTENT_STYLE = {
  fontFamily: "Inter",
  fontSize: "18px",
  fontWeight: "400",
};
