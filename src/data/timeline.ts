export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

export const timeline: TimelineItem[] = [
  {
    date: "O começo",
    title: "Quando tudo começou",
    description:
      "Nosso chima matinal — Lembro que essas foram nossas primeiras fotos juntos 📸.",
    image: "images/memory-03.jpeg",
  },
  {
    date: "Nossa aliança 💍",
    title: "Nossa aliança",
    description:
      "O momento em que nos comprometemos um com o outro — um símbolo do nosso amor e dedicação.",
    image: "images/memory-04.jpeg",
  },
  {
    date: "Nosso primeiro Natal Juntos 💕",
    title: "Nosso Natal juntos",
    description:
      "Esse natal — demos muitas risadas da tua mãe ksksks.",
    image: "images/memory-09.jpeg",
  },
];
