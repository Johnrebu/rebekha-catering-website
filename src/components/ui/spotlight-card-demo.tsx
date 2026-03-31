import { CalendarHeart, ChefHat, Sparkles } from "lucide-react";

import { GlowCard } from "@/components/ui/spotlight-card";

const spotlightCards = [
  {
    title: "Wedding Flow",
    description: "Elegant buffet planning with service pacing that keeps the celebration moving naturally.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    icon: CalendarHeart,
    glowColor: "orange" as const,
  },
  {
    title: "Signature Menus",
    description: "Curated veg and non-veg spreads built around guest count, timing, and taste.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    icon: ChefHat,
    glowColor: "green" as const,
  },
  {
    title: "Premium Finish",
    description: "Atmospheric presentation touches that make the food and tablescape feel memorable.",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    icon: Sparkles,
    glowColor: "blue" as const,
  },
];

export function SpotlightCardDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {spotlightCards.map(({ title, description, image, icon: Icon, glowColor }) => (
        <GlowCard
          key={title}
          customSize
          glowColor={glowColor}
          className="h-full min-h-[24rem] w-full overflow-hidden rounded-[28px] bg-[#120d0a]/70 p-2 shadow-[0_28px_80px_-50px_rgba(0,0,0,0.85)]"
        >
          <div className="relative overflow-hidden rounded-[20px]">
            <img src={image} alt={title} className="h-56 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-outliers-sans text-[0.68rem] uppercase tracking-[0.28em] text-[#f3d8b0]">
                  Experience
                </p>
                <h3 className="mt-2 text-4xl leading-[0.9] text-[#fff5e8]">{title}</h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <p className="px-4 pb-4 font-outliers-sans text-sm leading-6 text-[#efe3d4]">
            {description}
          </p>
        </GlowCard>
      ))}
    </div>
  );
}
