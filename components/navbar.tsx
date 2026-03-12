import Link from "next/link";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/" },
  { label: "Información", href: "/" },
  { label: "Contacto", href: "/" },
];

export default function Navbar() {
  return (
    <nav className="bg-black h-10 flex items-center justify-center px-4">
      <ul className="flex items-center gap-4 sm:gap-8 md:gap-12">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-white text-xs sm:text-sm font-medium tracking-wide hover:text-gray-300 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
