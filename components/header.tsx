import SideCartButton from "./Cart/side_cart_button";
import Link from "next/link";

type HeaderProps = {
  showCartButton?: boolean;
};

export default function Header({ showCartButton = true }: HeaderProps) {
  return (
    <header
      className="flex relative h-30 items-center justify-center 
      bg-slate-900/80 shadow-sm"
    >
      <Link href="/">
        <h1
          className="text-4xl text-white font-serif hover:scale-[1.015] 
           duration-300 transform translate-all tracking-wider select-none cursor-pointer"
        >
          Vinilo Market
        </h1>
      </Link>
      {showCartButton && <SideCartButton />}
    </header>
  );
}
