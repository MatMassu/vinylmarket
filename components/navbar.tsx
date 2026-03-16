import Link from "next/link";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Ver todo", href: "/store" },
  { label: "Información", href: "/" },
  { label: "Contacto", href: "/" },
];

export default function Navbar() {
  return (
    <nav className="bg-black h-10 flex items-center px-6 sm:px-12 md:px-50">
      <ul className="flex items-center justify-between w-full">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wide hover:text-gray-300 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
