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

export type CartItemType = Product & {
  quantity: number;
};
