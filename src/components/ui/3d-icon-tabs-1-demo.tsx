"use client";

import { useState } from "react";
import { Briefcase, Cake, Heart, House, UtensilsCrossed } from "lucide-react";

import { Component, type IconTabItem } from "@/components/ui/3d-icon-tabs-1";

const tabs: IconTabItem[] = [
  {
    id: "weddings",
    label: "Weddings",
    icon: <Heart className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "birthdays",
    label: "Birthdays",
    icon: <Cake className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: <Briefcase className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "housewarming",
    label: "Housewarming",
    icon: <House className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "private-dining",
    label: "Dining",
    icon: <UtensilsCrossed className="h-7 w-7 md:h-8 md:w-8" />,
    badge: "NEW",
  },
];

export function DemoOne() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(tabs[0].id as string);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[hsl(45,40%,94%)] px-6">
      <Component tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId as string)} />
    </div>
  );
}
