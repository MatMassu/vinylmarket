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
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts();

  return (
    <main className="flex flex-col min-h-screen bg-white px-[clamp(0px,170px)]">
      <Filter />
      <div className="flex md:flex-row flex-col">
        <Toolbar />
        <ProductGrid
          products={products}
          page={Number(params.page ?? 1)}
          query={params.query}
          sort={params.sort}
        />
      </div>
    </main>
  );
}
