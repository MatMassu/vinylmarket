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
    <section className="bg-black text-white flex flex-col pb-10">

      {/* Outer grid — search bar lives in the 3fr column so it matches the hero image width */}
      <div className="flex flex-col mx-6 sm:mx-12 md:mx-50 md:grid md:grid-cols-[3fr_2fr] md:items-end">

        {/* Left: search bar + hero photo stacked */}
        <div className="flex flex-col">
          <div className="pt-6 pb-5">
            <form action="/store" method="get" className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 h-10">
              <input
                name="query"
                placeholder="Encontrá tu próximo vinilo..."
                className="flex-1 text-gray-700 placeholder:text-gray-400 text-sm outline-none bg-transparent"
                autoComplete="off"
              />
              <button
                type="submit"
                className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
              >
                →
              </button>
            </form>
          </div>

          {/* Hero photo */}
          <div className="relative min-h-[200px] md:min-h-[38vh] overflow-hidden">
            <Image
              src={heroImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Statement and CTA */}
            <div className="absolute bottom-0 pl-5 pb-6 pr-6 flex flex-col gap-3 max-w-2xl">
              <div className="text-white/90 text-sm sm:text-base leading-relaxed">
                <p>Más de 800 vinilos cuidadosamente seleccionados.</p>
                <p>Clasificados y embalados con criterio.</p>
                <p>Desde Buenos Aires a todo el país.</p>
              </div>
              <Link
                href="/store"
                className="self-start text-sm font-medium text-black bg-white px-5 py-2 hover:bg-gray-200 transition-colors"
              >
                Ver catálogo →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: featured vinyl + artist marquee */}
        {featured && (
          <div className="border-t md:border-t-0 md:border-l border-white/10 px-6 sm:px-8 md:pl-8 md:pr-8 py-5 md:py-6 flex flex-col gap-4 overflow-hidden">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-widest text-white/50">Destacado</p>
              <FeaturedVinylCard product={featured} />
            </div>

            {artists.length > 0 && (
              <div className="flex flex-col gap-1 mt-auto overflow-hidden">
                <p className="text-[10px] uppercase tracking-widest text-white/50">Más artistas en el catálogo</p>
                <div className="overflow-hidden">
                  <div className="flex gap-3 animate-[marquee_30s_linear_infinite] w-max">
                    {[...artists, ...artists].map((artist, i) => (
                      <Link
                        key={i}
                        href={`/store?query=${encodeURIComponent(artist)}`}
                        className="shrink-0 text-xs text-white/60 hover:text-white/90 transition-colors whitespace-nowrap"
                      >
                        {artist}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </section>
  );
}
