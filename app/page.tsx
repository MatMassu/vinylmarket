import "./globals.css";
import Header from "../components/header.tsx";
import ProductGrid from "../components/ProductGrid/product_grid.tsx";
import SearchBar from "../components/ProductToolbar/search.tsx";
import Filter from "../components/ProductToolbar/filter.tsx";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; filter?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <aside className="flex">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex-1">
          <Filter />
        </div>
      </aside>
      <ProductGrid query={params.query} filter={params.filter} />
    </main>
  );
}
