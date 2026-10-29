/** Minimal PDF builder for the live Nifty 50 stock tape (Helvetica only, no deps). */

const escapePdf = (value) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

function buildPage({ title, subtitle, rows, pageNumber, pageCount, startIndex }) {
  const lines = [];
  const push = (text, x, y, size = 10) => {
    lines.push(`BT /F1 ${size} Tf ${x} ${y} Td (${escapePdf(text)}) Tj ET`);
  };

  push(title, 40, 800, 16);
  push(subtitle, 40, 782, 9);
  push("Symbol", 40, 752, 10);
  push("LTP", 200, 752, 10);
  push("Change", 300, 752, 10);
  push("% Change", 420, 752, 10);
  lines.push("0.7 w 40 744 m 555 744 l S");

  let y = 726;
  rows.forEach((row, index) => {
    const sign = row.up ? "" : "-";
    push(String(startIndex + index + 1).padStart(2, "0"), 40, y, 9);
    push(row.symbol, 70, y, 9);
    push(row.value, 200, y, 9);
    push(`${sign}${row.change}`, 300, y, 9);
    push(`${sign}${row.percent}`, 420, y, 9);
    y -= 16;
  });

  push(`Page ${pageNumber} of ${pageCount}`, 260, 36, 8);
  push("Economic Vision — Live market data", 40, 36, 8);

  return lines.join("\n");
}

/** @param {{ symbol: string, value: string, change: string, percent: string, up: boolean }[]} stockTape */
export function buildStockTapePdf(stockTape, { generatedAt } = {}) {
  const title = "Nifty 50 — Live Stocks";
  const subtitle = `Average session snapshot | Generated ${generatedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;
  const perPage = 42;
  const pages = [];
  for (let i = 0; i < stockTape.length; i += perPage) {
    pages.push(stockTape.slice(i, i + perPage));
  }
  if (!pages.length) pages.push([]);

  const objects = [];
  const add = (content) => {
    objects.push(content);
    return objects.length;
  };

  const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];

  pages.forEach((rows, index) => {
    const content = buildPage({
      title,
      subtitle,
      rows,
      pageNumber: index + 1,
      pageCount: pages.length,
      startIndex: index * perPage,
    });
    const stream = `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}\nendstream`;
    const contentId = add(stream);
    const pageId = add(
      `<< /Type /Page /Parent PAGES_ID 0 R /MediaBox [0 0 595 842] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`
    );
    pageIds.push(pageId);
  });

  const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
  const pagesId = add(`<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`);
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  // Patch parent refs now that pagesId is known.
  for (const pageId of pageIds) {
    objects[pageId - 1] = objects[pageId - 1].replace("PAGES_ID", String(pagesId));
  }

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}
