import Link from "next/link";
import { getMediaImages } from "../lib/blob";

export default function Header() {
  const images = getMediaImages();
  return (
    <header
      className="flex relative h-30 items-center justify-center shadow-md bg-black border-b-white/60 border"
      style={{ backgroundImage: `url(${images.header})` }}
    >
      <Link href="/">
        <div className="text-white font-serif hover:scale-[1.05]
            duration-300 transform translate-all select-none cursor-pointer
            px-8 py-2 bg-transparent backdrop-blur-sm
            [mask-image:radial-gradient(ellipse_75%_95%_at_center,black_55%,transparent_100%)]">
        <h2 className="text-md xl:text-xl text-center tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
          Altillo
        </h2>
        <h1 className="text-3xl xl:text-4xl tracking-wider font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            MASSUCCO
        </h1>
        </div>
      </Link>
    </header>
  );
}
