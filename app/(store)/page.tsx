import "../globals.css";
import Header from "../../components/header";
import ProductGrid from "../../components/ProductGrid/product_grid";
import Pagination from "../../components/pagination";
import Toolbar from "../../components/ProductToolbar/toolbar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    filter?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen flex-col bg-indigo-200">
      <Header />
      <Toolbar />
      <ProductGrid
        page={Number(params.page ?? 1)}
        query={params.query}
        filter={params.filter}
        sort={params.sort}
        order={params.order}
      />
    </main>
  );
}
