import "../globals.css";
import ProductGrid from "../../components/ProductGrid/product_grid";
import Pagination from "../../components/pagination";
import Toolbar from "../../components/ProductToolbar/toolbar";
import Filter from "../../components/ProductToolbar/filter";
import { getProducts } from "../../lib/queries/products";

type SortOption = "price-desc" | "price-asc";

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    query?: string;
    sort?: SortOption;
    minCondition?: number;
    maxCondition?: number;
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts();

  return (
    <main className="flex flex-col min-h-screen bg-linear-to-b from-stone-50 to-stone-100 pt-10 px-[clamp(0px,170px)]">
      <Filter />
      <div className="flex md:flex-row flex-col">
        <Toolbar />
        <ProductGrid
          products={products}
          page={Number(params.page ?? 1)}
          query={params.query}
          sort={params.sort}
          minCondition={Number(params.minCondition ?? 0)}
          maxCondition={Number(params.maxCondition ?? 6)}
        />
      </div>
    </main>
  );
}
