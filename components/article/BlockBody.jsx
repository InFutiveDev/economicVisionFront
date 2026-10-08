export default function BlockBody({ blocks }) {
  return (
    <div className="mt-6 max-w-3xl space-y-5 text-[16px] leading-[1.75] text-slate-700">
      {blocks.map((block, index) => {
        const data = block.data || {};
        const key = block.id || `${block.type}-${index}`;

        if (block.type === "heading") {
          const Tag = data.level === 4 ? "h4" : data.level === 3 ? "h3" : "h2";
          return (
            <Tag key={key} className="font-serif text-[26px] font-bold leading-tight text-navy">
              {data.text}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return <p key={key}>{data.text}</p>;
        }

        if (block.type === "quote") {
          return (
            <blockquote key={key} className="border-l-[3px] border-brand-red bg-[#f8fafc] px-5 py-4">
              <p className="font-serif text-[18px] leading-relaxed text-navy sm:text-[20px]">“{data.text}”</p>
              {data.citation ? <footer className="mt-3 text-[13px] text-slate-500">— {data.citation}</footer> : null}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const items = Array.isArray(data.items) ? data.items : [];
          const ListTag = data.style === "ol" ? "ol" : "ul";
          return (
            <ListTag key={key} className={`space-y-1 pl-5 ${data.style === "ol" ? "list-decimal" : "list-disc"}`}>
              {items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{item}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "image" && data.url) {
          return (
            <figure key={key}>
              <img src={data.url} alt={data.alt || ""} className="w-full" />
              {data.caption ? <figcaption className="mt-2 text-[12px] text-slate-400">{data.caption}</figcaption> : null}
            </figure>
          );
        }

        if (block.type === "callout") {
          return (
            <aside key={key} className="rounded-lg border border-slate-200 bg-[#f8fafc] px-4 py-3">
              {data.title ? <p className="font-semibold text-navy">{data.title}</p> : null}
              {data.text ? <p>{data.text}</p> : null}
            </aside>
          );
        }

        if (block.type === "stats") {
          const items = Array.isArray(data.items) ? data.items : [];
          return (
            <div key={key} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {items.map((item, itemIndex) => (
                <div key={`${key}-${itemIndex}`} className="border border-slate-100 px-3 py-3">
                  <p className="text-[22px] font-bold text-navy">{item.value}</p>
                  <p className="text-[12px] text-slate-500">{item.label}</p>
                  {item.change ? <p className="text-[12px] text-slate-400">{item.change}</p> : null}
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "table") {
          const headers = Array.isArray(data.headers) ? data.headers : [];
          const rows = Array.isArray(data.rows) ? data.rows : [];
          return (
            <div key={key} className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[14px]">
                {headers.length ? (
                  <thead>
                    <tr>
                      {headers.map((header, headerIndex) => (
                        <th key={`${key}-h-${headerIndex}`} className="border-b border-slate-200 px-2 py-2 font-semibold text-navy">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${key}-r-${rowIndex}`}>
                      {(Array.isArray(row) ? row : []).map((cell, cellIndex) => (
                        <td key={`${key}-c-${rowIndex}-${cellIndex}`} className="border-b border-slate-100 px-2 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "gallery") {
          const images = Array.isArray(data.images) ? data.images.filter((image) => image?.url) : [];
          return (
            <div key={key} className="grid grid-cols-2 gap-3">
              {images.map((image, imageIndex) => (
                <figure key={`${key}-${imageIndex}`}>
                  <img src={image.url} alt={image.caption || ""} className="w-full" />
                  {image.caption ? <figcaption className="mt-1 text-[12px] text-slate-400">{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={key} className="overflow-x-auto bg-slate-900 p-4 text-[13px] leading-relaxed text-white">
              {data.code}
            </pre>
          );
        }

        if (block.type === "button" && data.label) {
          return (
            <a key={key} href={data.url || "#"} className="inline-flex bg-navy px-4 py-2 text-[13px] font-bold text-white">
              {data.label}
            </a>
          );
        }

        if (block.type === "divider") {
          return <hr key={key} className="border-slate-200" />;
        }

        return null;
      })}
    </div>
  );
}
