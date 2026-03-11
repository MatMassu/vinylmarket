export type Grading = "NM" | "VG+" | "VG" | "G+" | "G" | "F" | "P";

export type Product = {
  id: string;
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
  product_id: string;
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

export type ProductCardView = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  formattedPrice: string;
  stock: number;
  inStock: boolean;
  cover_condition: Grading;
  disc_condition: Grading;
  images: {
    grid: string;
    cart: string;
  };
};

export type CartItemType = ProductCardView & {
  quantity: number;
  images: CartImageVariants;
};

export type ModalImagesView = {
  images: string[];
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled";
