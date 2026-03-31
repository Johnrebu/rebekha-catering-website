"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type TabId = string | number;

export interface IconTabItem<T extends TabId = TabId> {
  id: T;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface ThreeDIconTabsProps<T extends TabId = TabId> {
  tabs: IconTabItem<T>[];
  activeTab?: T;
  defaultTab?: T;
  onTabChange?: (tabId: T) => void;
  className?: string;
}

function NewBadge({
  label = "NEW",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-full rounded-bl-sm rounded-br-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground shadow-[0_1px_3px_0_rgba(0,0,0,0.5),0_4px_12px_0_rgba(0,0,0,0.35)] before:absolute before:inset-0 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),inset_0_2px_10px_0_rgba(255,255,255,0.12)] before:content-['']",
        className
      )}
    >
      <span>{label}</span>
      <span
        className="absolute left-1/2 z-10 translate-y-2.5 -translate-x-1/2 scale-y-[-1] opacity-35"
        style={{
          maskImage: "linear-gradient(to top, white 18%, transparent 56%)",
          WebkitMaskImage: "linear-gradient(to top, white 18%, transparent 56%)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ThreeDIconTabs<T extends TabId = TabId>({
  tabs,
  activeTab,
  defaultTab,
  onTabChange,
  className,
}: ThreeDIconTabsProps<T>) {
  const fallbackTab = tabs[0]?.id;
  const [internalActiveTab, setInternalActiveTab] = useState<T | undefined>(
    defaultTab ?? activeTab ?? fallbackTab
  );

  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
      return;
    }

    if (tabs.length > 0 && !tabs.some((tab) => tab.id === internalActiveTab)) {
      setInternalActiveTab(tabs[0]?.id);
    }
  }, [activeTab, internalActiveTab, tabs]);

  const resolvedActiveTab = activeTab ?? internalActiveTab ?? fallbackTab;

  const tabItems = useMemo(() => tabs, [tabs]);

  const handleTabClick = (tabId: T) => {
    if (activeTab === undefined) {
      setInternalActiveTab(tabId);
    }

    onTabChange?.(tabId);
  };

  return (
    <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        className={cn(
          "mx-auto flex min-w-max items-start gap-4 rounded-[2rem] bg-white/80 p-3 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)] backdrop-blur md:min-w-0 md:flex-wrap md:justify-center",
          className
        )}
      >
        {tabItems.map((tab, index) => {
          const isActive = resolvedActiveTab === tab.id;

          return (
            <motion.button
              key={String(tab.id)}
              whileTap="tapped"
              whileHover="hovered"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative flex min-w-[112px] flex-col items-center gap-3 rounded-[1.65rem] px-4 pb-4 pt-3 text-center text-[0.75rem] uppercase tracking-[0.18em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(43,76%,58%)]",
                isActive
                  ? "text-[hsl(30,20%,15%)]"
                  : "text-[hsl(30,10%,45%)] hover:text-[hsl(30,20%,20%)]"
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-3d-tab-indicator"
                  className="absolute inset-x-5 bottom-0 h-1 rounded-full bg-[hsl(43,76%,58%)]"
                  transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10, rotateX: -16 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.2,
                    damping: 10,
                    duration: 0.55,
                    delay: index * 0.06,
                  },
                }}
                variants={{
                  hovered: isActive
                    ? { y: -2, scale: 1.02 }
                    : { y: -5, scale: 1.08, rotateY: -8, rotateX: 10 },
                  tapped: { y: 0, scale: 0.94 },
                }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {tab.badge ? <NewBadge label={tab.badge} className="absolute -right-8 -top-2 z-20" /> : null}

                <div
                  className={cn(
                    "relative flex size-16 items-center justify-center rounded-[1.35rem] border border-white/70 bg-gradient-to-b from-white to-[hsl(45,40%,94%)] shadow-[0_12px_25px_-18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.9)] md:size-20",
                    isActive &&
                      "border-[hsl(43,76%,58%)] bg-gradient-to-b from-[hsl(43,76%,72%)] to-[hsl(43,76%,58%)] text-[hsl(30,20%,15%)] shadow-[0_16px_30px_-18px_rgba(168,112,28,0.55),inset_0_1px_0_rgba(255,255,255,0.65)]"
                  )}
                >
                  <div className="absolute inset-[3px] rounded-[1.1rem] bg-white/35" />
                  <div className="relative z-10 text-current">{tab.icon}</div>
                </div>
              </motion.div>

              <span className={cn("relative z-10 font-medium", isActive && "tracking-[0.14em]")}>
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

const Component = ThreeDIconTabs;

export { Component, NewBadge, ThreeDIconTabs };
