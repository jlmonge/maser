export const PRODUCT_CATEGORIES = [
    {
        label: "Smartphones",
        value: "smartphones" as const,
        featured: [
            {
                name: "Editor Picks",
                href: "#",
                imageSrc: "/nav/smartphones/mixed.jpg",
            },
            {
                name: "New Arrivals",
                href: "#",
                imageSrc: "/nav/smartphones/blue.jpg",
            },
            {
                name: "Best Sellers",
                href: "#",
                imageSrc: "/nav/smartphones/purple.jpg",
            },
        ],
    },
    {
        label: "Wearables",
        value: "wearables" as const,
        featured: [
            {
                name: "Editor Picks",
                href: "#",
                imageSrc: "/nav/wearables/picks.jpg",
            },
            {
                name: "New Arrivals",
                href: "#",
                imageSrc: "/nav/wearables/new.jpg",
            },
            {
                name: "Best Sellers",
                href: "#",
                imageSrc: "/nav/wearables/bestsellers.jpg",
            },
        ],
    },
]