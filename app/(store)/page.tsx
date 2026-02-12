import "../globals.css";
import ProductGrid from "../../components/ProductGrid/product_grid";
import Pagination from "../../components/pagination";
import Toolbar from "../../components/ProductToolbar/toolbar";
import { getProducts } from "../../lib/queries/products";
import { Product } from "../../types/types";

type SortOption = "price" | "artist";
type OrderOption = "asc" | "desc";

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{
    products: Product;
    page?: number;
    query?: string;
    filter?: string;
    sort?: SortOption;
    order?: OrderOption;
  }>;
}) {
  const params = await searchParams;
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col bg-indigo-200">
      <Toolbar />
      <ProductGrid
        products={products}
        page={Number(params.page ?? 1)}
        query={params.query}
        filter={params.filter}
        sort={params.sort}
        order={params.order}
      />
    </main>
  );
}
