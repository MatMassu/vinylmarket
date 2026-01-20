import "./globals.css";
import Header from "../components/header.tsx";
import ProductGrid from "../components/ProductGrid/product_grid.tsx";
import SearchBar from "../components/ProductToolbar/search.tsx";
import Filter from "../components/ProductToolbar/filter.tsx";
import Sort from "../components/ProductToolbar/sort.tsx";
import Pagination from "../components/pagination.tsx";

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
    <main className="flex min-h-screen flex-col bg-blue-400">
      <Header />
      <aside className="flex bg-white">
        <div className="flex w-auto">
          <SearchBar />
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <Sort />
          <Filter />
        </div>
      </aside>
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
