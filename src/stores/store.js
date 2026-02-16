import { ref } from "vue";
import {
  CONTENT_STYLE,
  STYLE_MAP,
  TITLE_COLUMN_STYLE,
  TITLE_STYLE,
} from "../text_editor/utils";
import { DATA } from "./fakeData";

const data_xml = `
<slides>
  <slide name="slide1" layout="top" bg="/slide1_background.png">

    <block id="1" lvl="1">
      <text style="TITLE_STYLE">Poisonous Plants in Vietnam</text>
    </block>

    <block id="2" lvl="2">
      <text style="CONTENT_STYLE">
        Hidden dangers of the rainforest — beautiful, common, sometimes deadly.
      </text>
    </block>

    <block id="3" lvl="3" type="columns">

      <col id="0cc4622b-4405-46cb-ae42-80798b25f001">
        <title style="TITLE_COLUMN_STYLE">Where</title>
        <text style="CONTENT_STYLE">
          Lowland to highland forests across Vietnam
        </text>
      </col>

      <col id="84d73c2b-1036-41b5-8dcb-4a6be7b2199f">
        <title style="TITLE_COLUMN_STYLE">Why</title>
        <text style="CONTENT_STYLE">
          Plants evolved toxins for defense
        </text>
      </col>

      <col id="63c44dbb-f1f2-4a12-9bed-69347cf6e473">
        <title style="TITLE_COLUMN_STYLE">Who' at risk</title>
        <text style="CONTENT_STYLE">
          Trekkers, foragers, children, workers
        </text>
      </col>

    </block>

  </slide>
</slides>
`;

export function parseSlidesXML(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");

  const slides = [...xml.querySelectorAll("slide")];

  return slides.map((slide) => ({
    name: slide.getAttribute("name"),
    layout: slide.getAttribute("layout"),
    image_url: slide.getAttribute("bg"),
    contents: [...slide.querySelectorAll(":scope > block")].map(parseBlock),
  }));
}

function parseBlock(block) {
  const id = Number(block.getAttribute("id"));
  const level = Number(block.getAttribute("lvl"));
  const type = block.getAttribute("type");

  if (type === "columns") {
    return {
      id,
      level,
      data: {
        type: "columns",
        content: [...block.querySelectorAll(":scope > col")].map((col) => ({
          id: col.getAttribute("id"),
          title: buildDocFromElement(col.querySelector("title")),
          content: buildDocFromElement(col.querySelector("text")),
        })),
      },
    };
  }

  return {
    id,
    level,
    data: buildDocFromElement(block.querySelector("text")),
  };
}

function buildDocFromElement(el) {
  const text = el.textContent.trim();
  const styleKey = el.getAttribute("style");

  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text,
            marks: [
              {
                type: "textStyle",
                attrs: STYLE_MAP[styleKey] || {},
              },
            ],
          },
        ],
      },
    ],
  };
}

const output = parseSlidesXML(data_xml);

console.log(output, DATA);

const state = ref(output);

function updateState(slideName, key, value) {
  const slide = state.value.find((s) => s.name === slideName);
  if (slide) {
    slide[key] = value;
  }
}

export { state, updateState };
