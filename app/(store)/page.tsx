import HeroSection from "../../components/Home/hero_section";
import VinylCarousel from "../../components/Home/vinyl_carousel";
import { getFeaturedProduct, getTopArtists, getBestConditionVinyls } from "../../lib/queries/home";
import { getMediaImages } from "../../lib/blob";

export default async function InicioPage() {
  const { hero } = getMediaImages();
  const [featured, artists, bestCondition] = await Promise.all([
    getFeaturedProduct(),
    getTopArtists(),
    getBestConditionVinyls(),
  ]);

  return (
    <>
      <HeroSection heroImageUrl={hero} featured={featured} artists={artists} />
      <VinylCarousel title="Vinilos en mejor condición" products={bestCondition} />
    </>
  );
}
