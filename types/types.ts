export type Grading = "NM" | "VG+" | "VG" | "G+" | "G" | "F" | "P";

export type Product = {
  id: number;
  slug: string;
  title: string;
  artist: string;
  price: number;
  stock: number;
  disc_count: number;
  cover_condition: Grading;
  disc_condition: Grading;
  created_at: string;
  updated_at: string;
};

export type ProductImages = {
  id: number;
  product_id: number;
  type: ImageType;
  variant: ImageVariant;
  url: string;
};

export type ImageVariant = "grid" | "cart" | "modal";

export type ImageType =
  | "frente"
  | "rev"
  | "disco"
  | "disco1"
  | "disco2"
  | "disco3"
  | "folleto"
  | "folleto_rev";

export type CartImageVariants = {
  grid: string;
  cart: string;
};

export type CartItemType = Product & {
  quantity: number;
  images: CartImageVariants;
};
