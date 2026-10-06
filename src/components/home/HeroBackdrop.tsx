import Image from "next/image";
import { siteImages } from "@/content/images";

/**
 * The home hero photo, one <Image> that changes role with the viewport:
 * - below `lg`: a block under the text, cropped (object-position) to the monitor, chips and mug;
 * - `lg`+: behind the page, starting right of the headline and fading in from the left. The photo's open
 *   sky is only its left fifth, so the box is offset until the mountains begin where the headline ends.
 */
export function HeroBackdrop() {
  return (
    <div className="relative mt-3 h-[17rem] overflow-hidden sm:h-[22rem] lg:absolute lg:inset-y-0 lg:left-[26%] lg:right-0 lg:mt-0 lg:h-auto lg:[mask-image:linear-gradient(to_right,transparent_0,#000_24%)] xl:left-[22%] min-[1800px]:left-[25%]">
      <Image
        src={siteImages.homeHero.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-[80%_58%] sm:object-[76%_58%] lg:object-[100%_60%] dark:brightness-90"
      />

      {/* Readability veil behind the headline (desktop only; on mobile the text sits above the photo) */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-white/30 via-white/5 to-transparent lg:block dark:from-[#070b1f]/80 dark:via-[#070b1f]/40" />
      {/* Soft edges into the page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-canvas to-transparent lg:hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  );
}
