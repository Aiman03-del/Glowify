export const products = [
  {
    id: 1,
    name: "HydraGlow Serum",
    price: 29,
    description:
      "HydraGlow Serum deeply hydrates your skin and enhances natural radiance. Perfect for all skin types.",
    images: [
      "/assets/serum.jpg",
      "/assets/serum-2.jpg",
      "/assets/serum-3.jpg",
    ],
    variants: {
      size: ["30ml", "50ml", "100ml"],
      scent: ["unscented", "rose", "citrus"],
    },
  },
  {
    id: 2,
    name: "Rose Radiance Cream",
    price: 35,
    description:
      "Rose Radiance Cream nourishes your skin while giving a subtle rosy glow. Ideal for daily use.",
  images: ["/assets/cream.jpg"],
  variants: {
    size: ["50ml", "100ml"],
    scent: ["rose", "lavender"],
  },
  },
  {
    id: 3,
    name: "Lush Lips Balm",
    price: 15,
    description:
      "Lush Lips Balm moisturizes and protects your lips, leaving them soft and luscious all day.",
  images: ["/assets/lip-balm.jpg"],
  variants: {
    flavor: ["mint", "vanilla", "berry"],
  },
  },
];

export type Product = (typeof products)[number];
