"use client";

import { useState } from "react";
import EditionBar from "./EditionBar";
import PaperViewer from "./PaperViewer";
import PageThumbs from "./PageThumbs";

export default function EPaperView({ edition }) {
  const [index, setIndex] = useState(0);
  const pages = edition.pages;
  const page = pages[index];

  return (
    <>
      <EditionBar
        edition={edition}
        currentPage={index + 1}
        totalPages={pages.length}
      />
      <PaperViewer
        page={page}
        pages={pages}
        pageNumber={index + 1}
        totalPages={pages.length}
        onPrev={() => setIndex((value) => Math.max(0, value - 1))}
        onNext={() => setIndex((value) => Math.min(pages.length - 1, value + 1))}
        onSelect={setIndex}
        downloadHref={page.image}
      />
      <PageThumbs pages={pages} currentIndex={index} onSelect={setIndex} />
    </>
  );
}
