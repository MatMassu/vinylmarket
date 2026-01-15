import ProductCard from "./product_card.tsx";
import { products } from "./types.ts";

type ProductGridProps = {
  query?: string;
};

export default function ProductGrid({ query }: ProductGridProps) {
  const filteredProducts = query
    ? products.filter((product) =>
        `${product.artist} ${product.title}`.toLowerCase().includes(query.toLowerCase())
      )
    : products;
  return (
    <section className="flex-1 overflow-y-auto bg-blue-400">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            artist={product.artist}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
