"use client";

import { useEffect } from "react";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

const galleryHeroDemo = {
  mediaSrc:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
  backgroundSrc:
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1920&q=80",
  title: "Event Gallery",
  date: "Chennai Celebrations",
  scrollToExpand: "Scroll to reveal",
};

export function ScrollExpansionHeroDemo() {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resetSection"));
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={galleryHeroDemo.mediaSrc}
        bgImageSrc={galleryHeroDemo.backgroundSrc}
        title={galleryHeroDemo.title}
        date={galleryHeroDemo.date}
        scrollToExpand={galleryHeroDemo.scrollToExpand}
        textBlend
      >
        <div className="mx-auto w-full max-w-4xl rounded-[2rem] border border-[hsl(40,20%,85%)] bg-white/95 p-8 text-[hsl(30,20%,15%)] shadow-[0_24px_60px_rgba(34,24,12,0.12)]">
          <h2
            className="mb-4 text-4xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Immersive gallery intro
          </h2>
          <p className="text-sm uppercase tracking-[0.32em] text-[hsl(30,10%,45%)]">
            Scroll-based reveal component
          </p>
          <p className="mt-6 text-base leading-8 text-[hsl(30,10%,32%)] md:text-lg">
            This demo shows how the hero can open with a cinematic image and then
            reveal the full content area beneath it. It works well for galleries,
            menus, or event story pages where you want a stronger visual entry
            before showing detailed content.
          </p>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}

export default ScrollExpansionHeroDemo;
