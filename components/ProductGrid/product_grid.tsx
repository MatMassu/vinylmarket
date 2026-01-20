import ProductCard from "./product_card.tsx";
import { products } from "./types.ts";
import Pagination from "../pagination.tsx";

type SortOption = "price" | "artist";
type OrderOption = "asc" | "desc";
type ProductGridProps = {
  page?: number;
  query?: string;
  filter?: string;
  sort?: SortOption;
  order?: OrderOption;
};

const PAGE_SIZE = 12;

export default function ProductGrid({ page = 1, query, filter, sort, order }: ProductGridProps) {
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
    result = [...result].sort((a, b) => {
      const dir = order === "asc" ? 1 : -1;

      switch (sort) {
        case "price":
          return (a.price - b.price) * dir;
          break;
        case "artist":
          return a.artist.localeCompare(b.artist) * dir;
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
    <section className="flex-1 overflow-y-auto">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            artist={product.artist}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
      {hasMore && <Pagination />}
    </section>
  );
}
