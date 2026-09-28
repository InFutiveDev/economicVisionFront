const commodities = [
  { name: "Gold (MCX)", value: "72,540", change: "+0.44%", up: true },
  { name: "Silver (MCX)", value: "88,410", change: "+0.69%", up: true },
  { name: "Crude Oil", value: "6,420", change: "-0.43%", up: false },
  { name: "Natural Gas", value: "198.40", change: "+1.12%", up: true },
];

export default function CommodityWatch() {
  return (
    <aside className="border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Commodities</h3>
      </div>
      <ul className="divide-y divide-slate-100">
        {commodities.map((item) => (
          <li key={item.name} className="flex items-center justify-between px-4 py-2.5">
            <span className="text-sm font-semibold text-slate-800">{item.name}</span>
            <span className="text-right">
              <span className="block text-sm font-bold text-slate-900">{item.value}</span>
              <span className={`text-xs font-semibold ${item.up ? "text-green-600" : "text-red-600"}`}>
                {item.change}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
