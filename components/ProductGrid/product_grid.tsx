import ProductCard from "./product_card";
import { Product } from "../../types/types";
import Pagination from "../pagination";

type SortOption = "price-desc" | "price-asc";
type ProductGridProps = {
  products: Product[];
  page?: number;
  query?: string;
  sort?: SortOption;
};

const PAGE_SIZE = 12;

export default function ProductGrid({ products, page = 1, query, sort }: ProductGridProps) {
  let result = [...products];

  if (query) {
    result = result.filter((product) =>
      `${product.artist} ${product.title}`.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (sort) {
    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price-desc":
          return b.price - a.price;
          break;
        case "price-asc":
          return a.price - b.price;
          break;
        default:
          return 0;
      }
    });
  }

  const visibleCount = page * PAGE_SIZE;
  const visibleProducts = result.slice(0, visibleCount);
  const hasMore = visibleCount < result.length;

  return (
    <section className="flex-1">
      <div className="grid md:max-w-[90vw] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mx-6 mb-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && <Pagination />}
      {visibleProducts.length == 0 && (
        <div className="flex w-full justify-center">
          No se encontraron resultados para "{query}"
        </div>
      )}
    </section>
  );
}
