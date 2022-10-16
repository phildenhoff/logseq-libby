import "@logseq/libs";
import "svelte";

import App from "./App.svelte";

const main = () => {
  const addColorStyle = import.meta.env.PROD ? "" : "color: orange!important;";

  logseq.useSettingsSchema([]);

  new App({
    target: document.getElementById("app"),
  });

  const createModel = () => ({
    show: () => {
      logseq.showMainUI();
    },
  });

  logseq.provideModel(createModel());

  logseq.App.registerUIItem("toolbar", {
    key: "logseq-libby",
    template: `
      <a data-on-click="show" class="button ti ti-book-download" style="font-size: 24px; margin: 4px 6px; ${addColorStyle}"></a>
    `,
  });
};

logseq.ready(main).catch(console.error);
