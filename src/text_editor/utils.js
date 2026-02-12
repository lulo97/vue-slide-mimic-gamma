/**
 * Map UI text style type to Tiptap textStyle attributes
 *
 * @param {string} type
 * @returns {{ fontSize?: string, fontWeight?: string } | null}
 */
export function getTextStyleAttributes(type) {
  const map = {
    paragraph: null,
    h1: { fontSize: "32px", fontWeight: "700" },
    h2: { fontSize: "26px", fontWeight: "600" },
    h3: { fontSize: "20px", fontWeight: "600" },
    h4: { fontSize: "18px", fontWeight: "500" },
    small: { fontSize: "12px", fontWeight: "400" },
    medium: { fontSize: "16px", fontWeight: "400" },
    large: { fontSize: "20px", fontWeight: "500" },
  };

  return map[type] ?? null;
}

/**
 * Generate button class list
 *
 * @param {boolean} active
 * @returns {string[]}
 */
export function getButtonClass(active) {
  return [
    "px-2 py-1 text-sm rounded-md transition",
    active ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200",
  ];
}

/**
 * Check if editor content should update
 *
 * @param {string} currentHTML
 * @param {string} incomingHTML
 * @returns {boolean}
 */
export function shouldUpdateContent(currentHTML, incomingHTML) {
  return currentHTML !== incomingHTML;
}
