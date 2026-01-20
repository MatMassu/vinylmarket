import ProductCard from "./product_card.tsx";
import { products } from "./types.ts";

type SortOption = "price-asc" | "price-desc" | "artist-asc" | "artist-desc";

type ProductGridProps = {
  query?: string;
  filter?: string;
  sort?: SortOption;
};

export default function ProductGrid({ query, filter, sort }: ProductGridProps) {
  let result = [...products];

  if (query) {
    result = result.filter((product) =>
      `${product.artist} ${product.title}`.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter === "available") {
    result = result.filter((product) => product.stock > 0);
  }

  if (sort) {
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "artist-asc":
        result.sort((a, b) => `${a.artist}`.localeCompare(`${b.artist}`));
        break;

      case "artist-desc":
        result.sort((a, b) => `${b.artist}`.localeCompare(`${a.artist}`));
        break;
    }
  }

  return (
    <section className="flex-1 overflow-y-auto bg-blue-400">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
        {result.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            artist={product.artist}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
    </section>
  );
}
