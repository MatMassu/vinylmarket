import ProductCard from "./product_card.tsx";
import { products } from "@/types/types.ts";
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
const compareStrings = (a: string, b: string, dir: number) => a.localeCompare(b) * dir;

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
          return compareStrings(a.artist, b.artist, dir) || compareStrings(a.title, b.title, dir);
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
    <section className="flex-1 overflow-y-auto pt-5 md:pt-12">
      <div className="mx-auto grid md:max-w-[90vw] xs:grid-cols-2 grid-cols-3 md:grid-cols-4 gap-6 lg:gap-12 p-6">
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
