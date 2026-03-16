import Link from "next/link";
import { getMediaImages } from "../lib/blob";

export default function Header() {
  const images = getMediaImages();
  return (
    <header
      className="flex relative h-30 items-center justify-center shadow-md bg-black border-b-white/60 border"
      //style={{ backgroundImage: `url(${images.header})` }}
    >
      <Link href="/">
        <h1
          className="text-4xl xl:text-5xl text-white font-serif hover:scale-[1.05]
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            duration-300 transform translate-all tracking-wider select-none cursor-pointer"
        >
          Vinilo Market
        </h1>
      </Link>
    </header>
  );
}
