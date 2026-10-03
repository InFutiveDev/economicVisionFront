const CESS_RATE = 0.04;
const NEW_REBATE_LIMIT = 1200000;
const OLD_REBATE_LIMIT = 500000;
const OLD_REBATE_MAX = 12500;

export const ageGroups = [
  { id: "below60", label: "Below 60", oldExempt: 250000 },
  { id: "senior", label: "60–80", oldExempt: 300000 },
  { id: "superSenior", label: "Above 80", oldExempt: 500000 },
];

export const newRegimeSlabs = [
  { upTo: 400000, rate: 0 },
  { upTo: 800000, rate: 5 },
  { upTo: 1200000, rate: 10 },
  { upTo: 1600000, rate: 15 },
  { upTo: 2000000, rate: 20 },
  { upTo: 2400000, rate: 25 },
  { upTo: Infinity, rate: 30 },
];

export function oldRegimeSlabs(ageId) {
  const exempt = ageGroups.find((group) => group.id === ageId)?.oldExempt ?? 250000;
  return [
    { upTo: exempt, rate: 0 },
    { upTo: 500000, rate: 5 },
    { upTo: 1000000, rate: 10 },
    { upTo: 2000000, rate: 20 },
    { upTo: Infinity, rate: 30 },
  ];
}

export function calculateIncomeTax({
  income,
  ageId = "below60",
  deduction80c = 0,
  deduction80d = 0,
  otherDeductions = 0,
}) {
  const capped80c = clamp(deduction80c, 0, 150000);
  const capped80d = clamp(deduction80d, 0, 100000);
  const cappedOther = Math.max(0, otherDeductions);

  const next = computeRegime({
    income,
    standardDeduction: 75000,
    extraDeductions: 0,
    slabs: newRegimeSlabs,
    rebateLimit: NEW_REBATE_LIMIT,
    rebateMax: Infinity,
    regime: "new",
  });

  const old = computeRegime({
    income,
    standardDeduction: 50000,
    extraDeductions: capped80c + capped80d + cappedOther,
    slabs: oldRegimeSlabs(ageId),
    rebateLimit: OLD_REBATE_LIMIT,
    rebateMax: OLD_REBATE_MAX,
    regime: "old",
  });

  const better = next.total <= old.total ? "new" : "old";
  const saving = Math.abs(old.total - next.total);

  return {
    income,
    new: next,
    old,
    better,
    saving,
    deductions: { capped80c, capped80d, cappedOther },
  };
}

function computeRegime({ income, standardDeduction, extraDeductions, slabs, rebateLimit, rebateMax, regime }) {
  const taxable = Math.max(0, income - standardDeduction - extraDeductions);
  const slabTax = taxFromSlabs(taxable, slabs);
  const rebate = taxable <= rebateLimit ? Math.min(slabTax, rebateMax) : 0;
  let taxAfterRebate = Math.max(0, slabTax - rebate);

  if (regime === "new" && taxable > NEW_REBATE_LIMIT) {
    taxAfterRebate = Math.min(taxAfterRebate, taxable - NEW_REBATE_LIMIT);
  }

  const surchargeAmt = surcharge(taxAfterRebate, taxable, regime);
  const cess = (taxAfterRebate + surchargeAmt) * CESS_RATE;
  const total = taxAfterRebate + surchargeAmt + cess;
  const takeHome = Math.max(0, income - total);
  const effectiveRate = income > 0 ? (total / income) * 100 : 0;

  return {
    standardDeduction,
    extraDeductions,
    taxable,
    slabTax,
    rebate,
    surcharge: surchargeAmt,
    cess,
    total,
    takeHome,
    effectiveRate,
    slabs: slabRows(taxable, slabs).filter((row) => row.income > 0 || row.from === 0),
  };
}

function taxFromSlabs(income, slabs) {
  let tax = 0;
  let previous = 0;
  for (const slab of slabs) {
    const cap = slab.upTo;
    const band = Math.max(0, Math.min(income, cap) - previous);
    tax += band * (slab.rate / 100);
    previous = cap;
  }
  return tax;
}

function slabRows(income, slabs) {
  let previous = 0;
  return slabs.map((slab) => {
    const band = Math.max(0, Math.min(income, slab.upTo) - previous);
    const row = {
      from: previous,
      to: Number.isFinite(slab.upTo) ? slab.upTo : null,
      rate: slab.rate,
      income: band,
      tax: band * (slab.rate / 100),
    };
    previous = slab.upTo;
    return row;
  });
}

function surcharge(tax, income, regime) {
  if (income <= 5000000 || tax <= 0) return 0;
  let rate = 10;
  if (income > 50000000) rate = regime === "new" ? 25 : 37;
  else if (income > 20000000) rate = 25;
  else if (income > 10000000) rate = 15;
  return tax * (rate / 100);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
