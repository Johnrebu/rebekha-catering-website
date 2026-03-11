import React from "react";
import { Compare } from "@/components/ui/compare";

export function CompareDemo() {
  return (
    <div className="w-full max-w-[860px] p-4 border rounded-3xl bg-neutral-100 border-neutral-200">
      <Compare
        firstImage="https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1600"
        secondImage="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600"
        firstImageClassName="object-cover object-center"
        secondImageClassname="object-cover object-center"
        className="h-[220px] w-full sm:h-[320px] md:h-[460px]"
        slideMode="drag"
        initialSliderPercentage={55}
      />
    </div>
  );
}
