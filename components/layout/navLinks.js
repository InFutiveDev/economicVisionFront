export const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "#",
    label: "Economy",
    children: [
      { href: "#", label: "GDP" },
      { href: "#", label: "Inflation" },
      { href: "#", label: "GST" },
      { href: "#", label: "Jobs" },
      { href: "#", label: "Trade" },
    ],
  },
  { href: "/markets", label: "Markets" },
  {
    href: "#",
    label: "Business",
    children: [
      { href: "#", label: "Corporate" },
      { href: "#", label: "Startups" },
      { href: "#", label: "MSME" },
      { href: "#", label: "Real Estate" },
      { href: "#", label: "Auto" },
    ],
  },
  {
    href: "#",
    label: "Money",
    children: [
      { href: "#", label: "Tax" },
      { href: "#", label: "SIP" },
      { href: "#", label: "Mutual Funds" },
      { href: "#", label: "Insurance" },
      { href: "#", label: "Loans" },
      { href: "#", label: "Retirement" },
    ],
  },
  { href: "#", label: "Investing" },
  { href: "#", label: "Policy" },
  { href: "#", label: "Global" },
  { href: "#", label: "Opinion" },
];

// Categories with a dedicated page keep linking there instead of the generic category listing.
const PAGE_OVERRIDES = { markets: "/markets" };

export function buildNavLinks(categories) {
  if (!categories?.length) return navLinks;
  return [
    { href: "/", label: "Home" },
    ...categories.map((category) => {
      const href = PAGE_OVERRIDES[category.slug] || category.href;
      if (!category.children?.length) return { href, label: category.name };
      return {
        href,
        label: category.name,
        children: [
          { href, label: `All ${category.name}` },
          ...category.children.map((child) => ({ href: child.href, label: child.name })),
        ],
      };
    }),
  ];
}

export const toolsLinks = [
  { href: "/tools/compound-interest-calculator", label: "Compound Interest Calculator" },
  { href: "/tools/income-tax-calculator", label: "Income Tax Calculator" },
  { href: "/tools/inflation-calculator", label: "Inflation Calculator" },
  { href: "/tools/retirement-calculator", label: "Retirement Calculator" },
  { href: "/tools/gst-calculator", label: "GST Calculator" },
  { href: "/tools/lumpsum-calculator", label: "Lumpsum Calculator" },
  { href: "/tools/sip-calculator", label: "SIP Calculator" },
  { href: "/tools/loan-calculator", label: "Loan Calculator" },
  
  
];
export const moreLinks = [
  { href: "#", label: "Mutual Funds" },
  { href: "#", label: "IPO" },
  { href: "#", label: "Banking" },
  { href: "#", label: "Tax" },
  { href: "#", label: "MSME" },
  { href: "#", label: "Employment" },
  { href: "#", label: "Delhi/NCR" },
  { href: "#", label: "Crypto" },
  { href: "/media#podcasts", label: "Podcasts" },
  { href: "/media#stories", label: "Stories" },
  { href: "/epaper", label: "E-Paper" },
];
