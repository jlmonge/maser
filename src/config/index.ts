export const PRODUCT_CATEGORIES = [
  {
    label: "Smartphones",
    value: "smartphones" as const,
    featured: [
      {
        name: "Editor Picks",
        href: "/products?category=smartphones",
        // TODO: convert to jpg for consistency or create other standard
        imageSrc: "/nav/smartphones/editor.png",
      },
      {
        name: "New Arrivals",
        href: "/products?category=smartphones&sort=desc",
        imageSrc: "/nav/smartphones/new.jpg",
      },
      {
        name: "Best Sellers",
        href: "/products?category=smartphones",
        imageSrc: "/nav/smartphones/best.jpg",
      },
    ],
  },
  {
    label: "Wearables",
    value: "wearables" as const,
    featured: [
      {
        name: "Editor Picks",
        href: "/products?category=wearables",
        imageSrc: "/nav/wearables/placeholder.png",
      },
      {
        name: "New Arrivals",
        href: "/products?category=wearables&sort=desc",
        imageSrc: "/nav/wearables/placeholder.png",
      },
      {
        name: "Best Sellers",
        href: "/products?category=wearables",
        imageSrc: "/nav/wearables/placeholder.png",
      },
    ],
  },
];
