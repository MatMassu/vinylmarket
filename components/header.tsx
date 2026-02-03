import SideCartButton from "./Cart/side_cart_button";

export default function Header() {
  return (
    <header className="flex relative h-20 items-center justify-center bg-blue-900">
      <h1 className="text-4xl text-white font-serif tracking-wider">Vinilo Market</h1>
      <SideCartButton />
    </header>
  );
}
