import "./globals.css";
import Header from "../components/header.tsx";
import ProductGrid from "../components/ProductGrid/product_grid.tsx";
import Search from "../components/ProductToolbar/search.tsx";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Search />
      <ProductGrid query={params.query} />
    </main>
  );
}
