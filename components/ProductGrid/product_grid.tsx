import ProductCard from "./product_card";
import { ProductCardView } from "../../types/types";
import InfiniteScrollTrigger from "../infinite_scroll_trigger";

type SortOption = "price-desc" | "price-asc" | "date-desc";
type ProductGridProps = {
  products: ProductCardView[];
  page?: number;
  query?: string;
  sort?: SortOption;
  minCondition?: number;
  maxCondition?: number;
  minDiscCondition?: number;
  maxDiscCondition?: number;
};

const PAGE_SIZE = 12;
const CONDITION_SCALE = ["P", "F", "G", "G+", "VG", "VG+", "NM"] as const;

export default function ProductGrid({
  products,
  page = 1,
  query,
  sort,
  minCondition = 0,
  maxCondition = 6,
  minDiscCondition = 0,
  maxDiscCondition = 6,
}: ProductGridProps) {
  let result = [...products];

  if (query) {
    result = result.filter((product) =>
      `${product.artist} ${product.title}`.toLowerCase().includes(query.toLowerCase())
    );
  }

  result = result.filter((product) => {
    const cover = CONDITION_SCALE.indexOf(product.cover_condition);
    const disc = CONDITION_SCALE.indexOf(product.disc_condition);
    return (
      cover >= minCondition && cover <= maxCondition &&
      disc >= minDiscCondition && disc <= maxDiscCondition
    );
  });

  if (sort) {
    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price-desc": return b.price - a.price;
        case "price-asc":  return a.price - b.price;
        case "date-desc":  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:           return 0;
      }
    });
  }

  const visibleCount = page * PAGE_SIZE;
  const visibleProducts = result.slice(0, visibleCount);
  const hasMore = visibleCount < result.length;

  return (
    <section className="flex-1">
      <div className="grid md:max-w-[90vw] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-6 mb-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {hasMore && <InfiniteScrollTrigger />}
      {visibleProducts.length == 0 && (
        <div className="flex w-full justify-center">
          {query && `No se encontraron resultados para "${query}"`}
          {!query && "No se encontraron resultados. Intente con otros filtros."}
        </div>
      )}
    </section>
  );
}
