import { ChefHat } from "lucide-react";

import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";

const items = [
  {
    text: "WEDDINGS",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "CORPORATE",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "BIRTHDAYS",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    text: "PRIVATE DINING",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  },
];

const centerContent = (textSize: string) => (
  <div className="flex flex-col items-center gap-3 text-center text-[#444444]">
    <ChefHat className="h-7 w-7 text-[hsl(43,76%,58%)]" />
    <div className={textSize}>REBEKHA</div>
  </div>
);

export function MediumCircularRevealHeadingDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-16">
      <CircularRevealHeading
        items={items}
        centerText={centerContent("text-xl font-bold")}
        size="md"
      />
    </div>
  );
}

export function LargeCircularRevealHeadingDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-16">
      <CircularRevealHeading
        items={items}
        centerText={centerContent("text-2xl font-bold")}
        size="lg"
      />
    </div>
  );
}

export function SmallCircularRevealHeadingDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center p-16">
      <CircularRevealHeading
        items={items}
        centerText={centerContent("text-sm font-bold")}
        size="sm"
      />
    </div>
  );
}
