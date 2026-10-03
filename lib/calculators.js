export function calculateSip({ monthly, annualRate, years }) {
  const months = Math.max(0, Math.round(years * 12));
  const invested = monthly * months;
  const monthlyRate = annualRate / 12 / 100;

  let total = invested;
  if (monthlyRate > 0 && months > 0) {
    const growth = (1 + monthlyRate) ** months;
    total = monthly * ((growth - 1) / monthlyRate) * (1 + monthlyRate);
  }

  const returns = Math.max(0, total - invested);
  return { invested, returns, total, months };
}

export function sipYearBreakdown({ monthly, annualRate, years }) {
  return Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    const result = calculateSip({ monthly, annualRate, years: year });
    return { year, ...result };
  });
}

export function calculateLoan({ principal, annualRate, years }) {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 12 / 100;

  if (months === 0 || principal <= 0) {
    return { emi: 0, principal: 0, interest: 0, total: 0, months };
  }

  const emi =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);

  const total = emi * months;
  const interest = Math.max(0, total - principal);
  return { emi, principal, interest, total, months };
}

export function loanYearBreakdown({ principal, annualRate, years }) {
  const { emi } = calculateLoan({ principal, annualRate, years });
  const monthlyRate = annualRate / 12 / 100;
  let balance = principal;

  return Array.from({ length: years }, (_, index) => {
    let principalPaid = 0;
    let interestPaid = 0;

    for (let month = 0; month < 12; month += 1) {
      if (balance <= 0) break;
      const interestPart = monthlyRate === 0 ? 0 : balance * monthlyRate;
      const principalPart = Math.min(balance, Math.max(0, emi - interestPart));
      balance -= principalPart;
      principalPaid += principalPart;
      interestPaid += interestPart;
    }

    return {
      year: index + 1,
      principalPaid,
      interestPaid,
      outstanding: Math.max(0, balance),
    };
  });
}

export const compoundFrequencies = [
  { id: 1, label: "Yearly" },
  { id: 2, label: "Half-yearly" },
  { id: 4, label: "Quarterly" },
  { id: 12, label: "Monthly" },
];

export function calculateCompoundInterest({ principal, annualRate, years, frequency = 1 }) {
  const periodsPerYear = frequency > 0 ? frequency : 1;
  const rate = annualRate / 100;
  const total =
    rate === 0 || years === 0
      ? principal
      : principal * (1 + rate / periodsPerYear) ** (periodsPerYear * years);
  const interest = Math.max(0, total - principal);
  return { principal, interest, total };
}

export function compoundInterestYearBreakdown({ principal, annualRate, years, frequency = 1 }) {
  return Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    return { year, ...calculateCompoundInterest({ principal, annualRate, years: year, frequency }) };
  });
}

export function calculateInflation({ amount, annualRate, years }) {
  const rate = annualRate / 100;
  const futureCost = amount * (1 + rate) ** years;
  const purchasingPower = years === 0 || rate === -1 ? amount : amount / (1 + rate) ** years;
  return { amount, futureCost, purchasingPower, rise: Math.max(0, futureCost - amount) };
}

export function inflationYearBreakdown({ amount, annualRate, years }) {
  return Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    return { year, ...calculateInflation({ amount, annualRate, years: year }) };
  });
}

export function calculateLumpsum({ amount, annualRate, years }) {
  const { principal, interest, total } = calculateCompoundInterest({
    principal: amount,
    annualRate,
    years,
    frequency: 1,
  });
  return { invested: principal, returns: interest, total };
}

export function lumpsumYearBreakdown({ amount, annualRate, years }) {
  return Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    return { year, ...calculateLumpsum({ amount, annualRate, years: year }) };
  });
}

export const gstRates = [5, 12, 18, 28];

export function calculateGst({ amount, rate, mode = "exclusive" }) {
  const gstRate = Math.max(0, rate);
  if (mode === "inclusive") {
    const net = amount * (100 / (100 + gstRate));
    const gst = amount - net;
    return { net, gst, gross: amount, rate: gstRate };
  }
  const gst = amount * (gstRate / 100);
  return { net: amount, gst, gross: amount + gst, rate: gstRate };
}

export function calculateRetirement({
  currentAge,
  retirementAge,
  lifeExpectancy,
  monthlyExpense,
  inflation,
  annualReturn,
  currentSavings,
}) {
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  const yearsAfter = Math.max(0, lifeExpectancy - retirementAge);
  const inflationRate = inflation / 100;
  const preReturn = annualReturn / 100;
  const postReturn = Math.max(0.01, preReturn - 0.02);

  const futureMonthly = monthlyExpense * (1 + inflationRate) ** yearsToRetire;
  const firstYearAnnual = futureMonthly * 12;
  const corpus = growingAnnuityPresentValue(firstYearAnnual, postReturn, inflationRate, yearsAfter);
  const savingsFuture = currentSavings * (1 + preReturn) ** yearsToRetire;
  const shortfall = Math.max(0, corpus - savingsFuture);
  const monthlySip = sipForTarget(shortfall, annualReturn, yearsToRetire);

  return {
    yearsToRetire,
    yearsAfter,
    futureMonthly,
    firstYearAnnual,
    corpus,
    savingsFuture,
    shortfall,
    monthlySip,
    postReturn: postReturn * 100,
  };
}

export function retirementExpenseBreakdown({
  currentAge,
  retirementAge,
  monthlyExpense,
  inflation,
}) {
  const yearsToRetire = Math.max(0, retirementAge - currentAge);
  return Array.from({ length: yearsToRetire }, (_, index) => {
    const year = index + 1;
    const expense = monthlyExpense * (1 + inflation / 100) ** year;
    return {
      year,
      age: currentAge + year,
      monthlyExpense: expense,
      annualExpense: expense * 12,
    };
  });
}

function growingAnnuityPresentValue(firstPayment, returnRate, growthRate, years) {
  if (years <= 0 || firstPayment <= 0) return 0;
  if (Math.abs(returnRate - growthRate) < 1e-9) {
    return (firstPayment * years) / (1 + returnRate);
  }
  return (
    (firstPayment * (1 - ((1 + growthRate) / (1 + returnRate)) ** years)) / (returnRate - growthRate)
  );
}

function sipForTarget(target, annualRate, years) {
  const months = Math.max(0, Math.round(years * 12));
  const monthlyRate = annualRate / 12 / 100;
  if (target <= 0 || months === 0) return 0;
  if (monthlyRate === 0) return target / months;
  return target / (((1 + monthlyRate) ** months - 1) / monthlyRate) / (1 + monthlyRate);
}

export function formatInr(value, { compact = false } = {}) {
  const amount = Math.round(value);
  if (compact && amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}
