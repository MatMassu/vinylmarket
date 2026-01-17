import ProductCard from "./product_card.tsx";
import { products } from "./types.ts";

type ProductGridProps = {
  query?: string;
  filter?: string;
};

export default function ProductGrid({ query, filter }: ProductGridProps) {
  let result = products;

  if (query) {
    result = result.filter((product) =>
      `${product.artist} ${product.title}`.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter === "available") {
    result = result.filter((product) => product.stock > 0);
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
