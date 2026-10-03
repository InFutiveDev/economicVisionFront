import { formatInr } from "@/lib/calculators";

export default function InflationBreakdown({ rows }) {
  return (
    <section className="mt-6 border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
        <h2 className="text-[15px] font-bold uppercase tracking-[0.14em] text-navy">Year-wise cost</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <thead className="bg-[#f8fafc] text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-4 py-3 sm:px-5">Year</th>
              <th className="px-4 py-3">Today’s price</th>
              <th className="px-4 py-3">Price rise</th>
              <th className="px-4 py-3 sm:px-5">Future cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.year} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-navy sm:px-5">{row.year}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{formatInr(row.amount)}</td>
                <td className="px-4 py-3 tabular-nums text-slate-600">{formatInr(row.rise)}</td>
                <td className="px-4 py-3 font-semibold tabular-nums text-navy sm:px-5">
                  {formatInr(row.futureCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
