import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { CSS } from "./text_editor/utils";

Object.entries({
  ...CSS.TITLE_STYLE,
  ...CSS.CONTENT_STYLE,
  ...CSS.TITLE_COLUMN_STYLE,
}).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});

createApp(App).use(router).mount("#app");
