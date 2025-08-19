export enum CategoryEnum {
  RING = "RG",
  NECKLACE = "NL",
  EARRING = "ER",
  BANGLE = "BG",
  ANKLET = "AK",
  BRACELET = "BR",
  PENDANT = "PD",
  NOSEPIN = "NP",
  TOE_RING = "TR",
  CHAIN = "CH",
  MANGALSUTRA = "MS"
}

export const CategoryDisplay: Record<CategoryEnum, string> = {
  [CategoryEnum.RING]: "Ring (अंगूठी)",
  [CategoryEnum.NECKLACE]: "Necklace (हार)",
  [CategoryEnum.EARRING]: "Earring (झुमका)",
  [CategoryEnum.BANGLE]: "Bangle (चूड़ी)",
  [CategoryEnum.ANKLET]: "Anklet (पायल)",
  [CategoryEnum.BRACELET]: "Bracelet (कड़ा)",
  [CategoryEnum.PENDANT]: "Pendant (लॉकेट)",
  [CategoryEnum.NOSEPIN]: "Nose Pin (नथ)",
  [CategoryEnum.TOE_RING]: "Toe Ring (बिचुए)",
  [CategoryEnum.CHAIN]: "Chain (चेन)",
  [CategoryEnum.MANGALSUTRA]: "Mangalsutra (मंगलसूत्र)"
};

export enum MetalTypeEnum {
  GOLD_916 = "G916",
  GOLD_750 = "G750"
}
export const MetalTypeDisplay: Record<MetalTypeEnum, string> = {
  [MetalTypeEnum.GOLD_916]: "Gold 916",
  [MetalTypeEnum.GOLD_750]: "Gold 750"
};

export interface Product {
  name: string;
  code: string;
  description?: string;
  category: {
    code: CategoryEnum;
    displayName: string;
  };
  metalType: {
    code: MetalTypeEnum;
    displayName: string;
  };
  gender?: string;
  weight?: string;
  price: number;
  images: string[];
  isNewProduct: boolean;
  isOnSale: boolean;
  isFeatured: boolean;
  availableSizes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const sampleProducts: Product[] = [
  {
    name: "Diamond Solitaire Ring",
    code: "KA-RG001",
    description: "Elegant 1ct diamond ring crafted in premium 18k gold. This timeless piece features a brilliant-cut diamond set in a classic solitaire setting, perfect for engagements or special occasions.",
    category: { code: CategoryEnum.RING, displayName: CategoryDisplay[CategoryEnum.RING] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Female",
    weight: "3.5g",
    price: 125000,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: true,
    isOnSale: false,
    isFeatured: false,
    availableSizes: ["14", "16", "18", "20"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Traditional Gold Necklace",
    code: "KA-NL002",
    description: "Handcrafted 22k gold necklace with intricate traditional patterns. A perfect blend of heritage craftsmanship and contemporary elegance.",
    category: { code: CategoryEnum.NECKLACE, displayName: CategoryDisplay[CategoryEnum.NECKLACE] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Female",
    weight: "45g",
    price: 185000,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: false,
    isFeatured: true,
    availableSizes: ["16", "18", "20"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Chandelier Earrings",
    code: "KA-ER003",
    description: "Traditional design with modern elegance. These stunning chandelier earrings feature intricate gold work with precious stone accents.",
    category: { code: CategoryEnum.EARRING, displayName: CategoryDisplay[CategoryEnum.EARRING] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Female",
    weight: "8g",
    price: 65000,
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: true,
    isFeatured: false,
    availableSizes: ["One Size"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Designer Bangles Set",
    code: "KA-BG004",
    description: "Set of 4 bangles in 916 gold with contemporary design elements. Perfect for both casual and formal occasions.",
    category: { code: CategoryEnum.BANGLE, displayName: CategoryDisplay[CategoryEnum.BANGLE] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Female",
    weight: "32g",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: false,
    isFeatured: false,
    availableSizes: ["2.4", "2.6", "2.8"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Men's Gold Bracelet",
    code: "KA-BR005",
    description: "Bold and stylish 22k gold bracelet for men. A statement piece for any occasion.",
    category: { code: CategoryEnum.BRACELET, displayName: CategoryDisplay[CategoryEnum.BRACELET] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Male",
    weight: "18g",
    price: 72000,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: true,
    isOnSale: false,
    isFeatured: false,
    availableSizes: ["M", "L"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Pearl Drop Earrings",
    code: "KA-ER006",
    description: "Elegant pearl drop earrings set in 18k gold. Perfect for weddings and festive occasions.",
    category: { code: CategoryEnum.EARRING, displayName: CategoryDisplay[CategoryEnum.EARRING] },
    metalType: { code: MetalTypeEnum.GOLD_750, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_750] },
    gender: "Female",
    weight: "5g",
    price: 34000,
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: true,
    isFeatured: false,
    availableSizes: ["One Size"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Classic Gold Chain",
    code: "KA-CH007",
    description: "Simple and classic 22k gold chain. A must-have for every jewelry collection.",
    category: { code: CategoryEnum.CHAIN, displayName: CategoryDisplay[CategoryEnum.CHAIN] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Unisex",
    weight: "12g",
    price: 48000,
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: false,
    isFeatured: true,
    availableSizes: ["18", "20", "22"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Emerald Pendant Set",
    code: "KA-PD008",
    description: "Stunning pendant set with emerald stones and 18k gold. Includes matching earrings.",
    category: { code: CategoryEnum.PENDANT, displayName: CategoryDisplay[CategoryEnum.PENDANT] },
    metalType: { code: MetalTypeEnum.GOLD_750, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_750] },
    gender: "Female",
    weight: "10g",
    price: 56000,
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: true,
    isOnSale: false,
    isFeatured: false,
    availableSizes: ["One Size"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Ruby Studded Nose Pin",
    code: "KA-NP009",
    description: "Delicate nose pin studded with rubies, crafted in 22k gold.",
    category: { code: CategoryEnum.NOSEPIN, displayName: CategoryDisplay[CategoryEnum.NOSEPIN] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Female",
    weight: "1g",
    price: 8000,
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: false,
    isOnSale: true,
    isFeatured: false,
    availableSizes: ["One Size"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  },
  {
    name: "Kids' Gold Kada",
    code: "KA-AK010",
    description: "Cute and sturdy gold kada for kids, made with 916 gold.",
    category: { code: CategoryEnum.ANKLET, displayName: CategoryDisplay[CategoryEnum.ANKLET] },
    metalType: { code: MetalTypeEnum.GOLD_916, displayName: MetalTypeDisplay[MetalTypeEnum.GOLD_916] },
    gender: "Kids",
    weight: "6g",
    price: 21000,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    ],
    isNewProduct: true,
    isOnSale: false,
    isFeatured: false,
    availableSizes: ["S", "M"],
    createdAt: new Date("2025-08-19T02:13:13.907Z"),
    updatedAt: new Date("2025-08-19T02:13:13.907Z")
  }
];
