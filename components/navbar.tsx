"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Inicio",      href: "/",         exact: true  },
  { label: "Catálogo",    href: "/store",     exact: false },
  { label: "Información", href: "/#info",     exact: false },
  { label: "Contacto",    href: "/#contacto", exact: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black h-10 flex items-center">
      <ul className="flex w-full">
        {NAV_ITEMS.map(({ label, href, exact }) => {
          const hrefPath = href.split("#")[0] || "/";
          const active = exact
            ? pathname === hrefPath
            : pathname.startsWith(hrefPath) && hrefPath !== "/";

          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={[
                  "flex items-center justify-center h-10 w-full text-xs sm:text-sm md:text-base font-medium tracking-wide transition-colors duration-150",
                  active
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
