import { type ReactNode, useEffect, useState } from "react";
import {
  ChefHat,
  Flame,
  Leaf,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface InteractiveSelectorItem {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
  eyebrow?: string;
}

interface InteractiveSelectorProps {
  items?: InteractiveSelectorItem[];
  title?: string;
  description?: string;
  className?: string;
  initialActiveIndex?: number;
}

export const defaultInteractiveSelectorItems: InteractiveSelectorItem[] = [
  {
    title: "Wedding Buffets",
    description: "Layered buffet lines with signature mains, salads, and dessert finishes.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    icon: <ChefHat className="h-5 w-5 text-white" />,
    eyebrow: "Large-format service",
  },
  {
    title: "Live Counters",
    description: "Fresh dosa, grill, and interactive stations that keep guests circulating.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    icon: <Flame className="h-5 w-5 text-white" />,
    eyebrow: "Made to order",
  },
  {
    title: "Regional Classics",
    description: "South Indian comfort menus built around crowd favorites and ceremony staples.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    icon: <Leaf className="h-5 w-5 text-white" />,
    eyebrow: "Balanced menus",
  },
  {
    title: "Starter Service",
    description: "Crisp vegetarian and non-vegetarian starters timed for smooth guest flow.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    icon: <UtensilsCrossed className="h-5 w-5 text-white" />,
    eyebrow: "Event openers",
  },
  {
    title: "Dessert Tables",
    description: "Sweet endings with plated desserts, counters, and festive presentation.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    icon: <Sparkles className="h-5 w-5 text-white" />,
    eyebrow: "Finale moments",
  },
];

const InteractiveSelector = ({
  items = defaultInteractiveSelectorItems,
  title,
  description,
  className,
  initialActiveIndex = 0,
}: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(initialActiveIndex, Math.max(items.length - 1, 0)),
  );
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  useEffect(() => {
    setActiveIndex(Math.min(initialActiveIndex, Math.max(items.length - 1, 0)));
  }, [initialActiveIndex, items.length]);

  useEffect(() => {
    setAnimatedOptions([]);

    const timers = items.map((_, index) =>
      window.setTimeout(() => {
        setAnimatedOptions((previous) =>
          previous.includes(index) ? previous : [...previous, index],
        );
      }, 160 * index),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [items.length]);

  return (
    <div className={cn("relative text-white", className)}>
      {(title || description) && (
        <div className="mx-auto mb-8 max-w-2xl px-2 text-center">
          {title && (
            <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {title}
            </h3>
          )}
          {description && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75 md:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="rounded-[2rem] border border-white/10 bg-[#1d110a] p-3 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] md:p-4">
        <div className="flex flex-col gap-3 md:h-[430px] md:flex-row md:items-stretch">
          {items.map((option, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);

            return (
              <button
                key={`${option.title}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative overflow-hidden border border-white/10 text-left transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43,76%,58%)]",
                  isActive
                    ? "h-[320px] border-white/35 shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:h-auto md:flex-[5.4]"
                    : "h-[92px] md:h-auto md:flex-1",
                )}
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateX(0)" : "translateX(-48px)",
                  transitionProperty:
                    "opacity, transform, flex, height, border-color, box-shadow",
                }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out",
                    isActive ? "scale-100" : "scale-110 md:scale-[1.18]",
                  )}
                  style={{ backgroundImage: `url('${option.image}')` }}
                />
                <div
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    isActive
                      ? "bg-[linear-gradient(180deg,rgba(7,5,4,0.08),rgba(7,5,4,0.16)_40%,rgba(7,5,4,0.84)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(7,5,4,0.18),rgba(7,5,4,0.28)_38%,rgba(7,5,4,0.92)_100%)]",
                  )}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_36%)]" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-5">
                  <div className="flex items-end gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/35 backdrop-blur-md">
                      {option.icon}
                    </div>

                    <div className="min-w-0">
                      {option.eyebrow && (
                        <p
                          className={cn(
                            "text-[0.65rem] uppercase tracking-[0.28em] text-[hsl(43,76%,72%)] transition-all duration-500",
                            isActive
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-0 md:opacity-0",
                          )}
                        >
                          {option.eyebrow}
                        </p>
                      )}
                      <p
                        className={cn(
                          "mt-1 text-base font-semibold text-white transition-all duration-500 md:text-lg",
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-0 opacity-100 md:translate-y-3 md:opacity-0",
                        )}
                      >
                        {option.title}
                      </p>
                      <p
                        className={cn(
                          "max-w-[24rem] text-sm leading-6 text-white/80 transition-all duration-500",
                          isActive
                            ? "mt-2 max-h-24 translate-y-0 opacity-100"
                            : "mt-0 max-h-0 translate-y-3 overflow-hidden opacity-0",
                        )}
                      >
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSelector;
