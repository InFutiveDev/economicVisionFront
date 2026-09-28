const pages = [
  { title: "Page 1", image: "/epaper/page-0.jpg" },
  { title: "Page 2", image: "/epaper/page-1.jpg" },
  { title: "Page 3", image: "/epaper/page-2.jpg" },
  { title: "Page 4", image: "/epaper/page-3.jpg" },
  { title: "Page 5", image: "/epaper/page-4.jpg" },
  { title: "Page 6", image: "/epaper/page-5.jpg" },
  { title: "Page 7", image: "/epaper/page-6.jpg" },
  { title: "Page 8", image: "/epaper/page-7.jpg" },
];

export const editions = [
  {
    slug: "indore-10-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Indore",
    date: "Thursday, 10 September 2026",
    dateShort: "10 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
    today: true,
  },
  {
    slug: "indore-09-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Indore",
    date: "Wednesday, 9 September 2026",
    dateShort: "09 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
  },
  {
    slug: "indore-08-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Indore",
    date: "Tuesday, 8 September 2026",
    dateShort: "08 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
  },
  {
    slug: "indore-07-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Indore",
    date: "Monday, 7 September 2026",
    dateShort: "07 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
  },
  {
    slug: "bhopal-10-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Bhopal",
    date: "Thursday, 10 September 2026",
    dateShort: "10 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
  },
  {
    slug: "ujjain-10-sep-2026",
    name: "संवाद फर्स्ट",
    city: "Ujjain",
    date: "Thursday, 10 September 2026",
    dateShort: "10 Sep 2026",
    cover: "/epaper/page-0.jpg",
    pages,
  },
];

export function getEdition(slug) {
  return editions.find((item) => item.slug === slug);
}
