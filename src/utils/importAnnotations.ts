import type { Annotation } from "src/types";

export const importAnnotations = async (
  pageName: string,
  annotations: Annotation[]
) => {
  const createdPage = await logseq.Editor.createPage(pageName);
  console.log({ createdPage });
  await logseq.Editor.insertBatchBlock(
    createdPage.uuid,
    annotations.map((annotation) => ({
      content: `> ${annotation.highlight}\n\n${annotation.annotation ?? ""}`,
    }))
  );
};
