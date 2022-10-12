import { describe, expect, it } from "vitest";
import { coverUrlFromExport } from "./libby";

describe("libby services", () => {
  // TODO: this is a pretty garbage test TBH
  it("returns the cover URL from the Reading Journey", () => {
    const exampleUrl =
      "https://img1.od-cdn.com/ImageType-100/0017-1/{408231EB-FD48-4383-8EDA-F13493D79FB8}Img100.jpg";
    const mockExport = {
      version: 1,
      readingJourney: {
        cover: {
          url: exampleUrl,
        },
      },
    } as const;

    expect(coverUrlFromExport(mockExport)).toBe(exampleUrl);
  });
});
