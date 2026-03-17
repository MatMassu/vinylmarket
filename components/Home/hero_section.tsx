import Image from "next/image";
import Link from "next/link";
import { ProductCardView } from "../../types/types";
import FeaturedVinylCard from "./featured_vinyl_card";

type Props = {
  heroImageUrl: string;
  featured: ProductCardView | null;
  artists: string[];
};

export default function HeroSection({ heroImageUrl, featured, artists }: Props) {
  return (
    <section className="bg-black text-white flex flex-col min-h-[55vh]">

      {/* Search bar */}
      <div className="px-6 sm:px-12 md:px-20 pt-7 pb-5">
        <form action="/store" method="get" className="flex items-center gap-3 border-b border-white/20 pb-3 max-w-lg">
          <input
            name="query"
            placeholder="Encontrá tu próximo vinilo..."
            className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="cursor-pointer text-white/60 hover:text-white transition-colors text-lg leading-none"
          >
            →
          </button>
        </form>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* Left: hero photo with statement overlay */}
        <div className="relative flex-[3] min-h-[260px] overflow-hidden">
          <Image
            src={heroImageUrl}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Statement, artist tags and CTA — bottom-left */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 flex flex-col gap-4 max-w-lg">
            <p className="text-white/90 text-base sm:text-lg font-light leading-relaxed">
              Más de 800 vinilos seleccionados. Cuidadosamente clasificados y embalados.
              Desde Buenos Aires a todo el país.
            </p>

            {artists.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artists.map((artist) => (
                  <Link
                    key={artist}
                    href={`/store?query=${encodeURIComponent(artist)}`}
                    className="text-xs text-white/70 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                  >
                    {artist}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/store"
              className="self-start text-sm font-medium text-black bg-white px-5 py-2 hover:bg-gray-200 transition-colors"
            >
              Ver catálogo →
            </Link>
          </div>
        </div>

        {/* Right: featured vinyl */}
        {featured && (
          <div className="flex-[2] border-t md:border-t-0 md:border-l border-white/10 px-6 sm:px-8 md:px-10 py-6 md:py-8 flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-widest text-white/40">Destacado</p>
            <FeaturedVinylCard product={featured} />
          </div>
        )}
      </div>

    </section>
  );
}
