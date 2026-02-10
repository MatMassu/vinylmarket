import SideCartButton from "./Cart/side_cart_button";
import Link from "next/link";

export default function Header({ Cart }: { Cart: boolean }) {
  return (
    <header className="flex relative h-20 items-center justify-center bg-blue-900">
      <Link href="/">
        <h1 className="text-4xl text-white font-serif tracking-wider select-none cursor-pointer">
          Vinilo Market
        </h1>
      </Link>
      {Cart && <SideCartButton />}
    </header>
  );
}
