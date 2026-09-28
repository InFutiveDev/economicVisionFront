const currencies = [
  { name: "USD/INR", value: "83.12", change: "-0.10%", up: false },
  { name: "EUR/INR", value: "91.48", change: "+0.22%", up: true },
  { name: "GBP/INR", value: "108.36", change: "+0.18%", up: true },
  { name: "JPY/INR", value: "0.562", change: "-0.08%", up: false },
];

export default function CurrencyWatch() {
  return (
    <aside className="border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-navy">Currencies</h3>
      </div>
      <ul className="divide-y divide-slate-100">
        {currencies.map((item) => (
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
