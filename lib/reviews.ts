export type Review = {
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO or friendly
};

export const reviewsByProduct: Record<number, Review[]> = {
  1: [
    { user: "Aisha", rating: 5, comment: "Skin feels hydrated and glowing!", date: "2025-08-12" },
    { user: "Rafi", rating: 4, comment: "Lightweight, absorbs fast.", date: "2025-07-29" },
    { user: "Nadia", rating: 5, comment: "Perfect for my dry skin.", date: "2025-06-03" },
  ],
  2: [
    { user: "Imran", rating: 4, comment: "Nice scent, good for daily use.", date: "2025-05-18" },
    { user: "Sara", rating: 3, comment: "Moisturizes okay, a bit rich for me.", date: "2025-05-20" },
  ],
  3: [
    { user: "Lamia", rating: 5, comment: "Lips stayed soft all day!", date: "2025-09-01" },
    { user: "Tanvir", rating: 4, comment: "Berry flavor is great.", date: "2025-09-08" },
  ],
};
