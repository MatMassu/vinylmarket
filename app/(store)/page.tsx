import HeroSection from "../../components/Home/hero_section";
import { getFeaturedProduct, getTopArtists } from "../../lib/queries/home";
import { getMediaImages } from "../../lib/blob";

export default async function InicioPage() {
  const { hero } = getMediaImages();
  const [featured, artists] = await Promise.all([
    getFeaturedProduct(),
    getTopArtists(),
  ]);

  return (
    <>
      <HeroSection heroImageUrl={hero} featured={featured} artists={artists} />
      {/* Carousels: Mejor condición, Más populares, Más raros — próximamente */}
    </>
  );
}
