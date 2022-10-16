type ReadableCover = {
  contentType?: "image/jpeg";
  url?: string;
  title?: string;
  color?: string;
  format?: "ebook" | string;
};
type ReadableTitle = {};
type Percent = number;
type Highlight = {
  timestamp?: number;
  chapter?: string;
  percent?: Percent;
  color?: string;
  quote?: string;
  note?: string;
};
type LibbyExport = {
  version: 1;
  readingJourney?: {
    cover?: ReadableCover;
    title?: ReadableTitle;
    author?: string;
    publisher?: string;
    isbn?: string;
    percent?: Percent;
  };
  highlights?: Highlight[];
};

export const coverUrlFromExport = (libExport: LibbyExport) =>
  libExport.readingJourney.cover.url;

export const annotationsFromExport = (libExport: LibbyExport) =>
  libExport.highlights.map((item) => ({
    annotation: item.note,
    highlight: item.quote,
  }));
