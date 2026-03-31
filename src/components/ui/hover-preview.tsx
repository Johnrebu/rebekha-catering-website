"use client";

import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const previewData = {
  weddings: {
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=560&h=320&q=80",
    title: "Wedding Feasts",
    subtitle: "Ceremony-led buffet styling with graceful service pacing",
  },
  corporate: {
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=560&h=320&q=80",
    title: "Corporate Lunches",
    subtitle: "Clean, timely setups built for teams, launches, and meetings",
  },
  birthdays: {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=560&h=320&q=80",
    title: "Birthday Tables",
    subtitle: "Lively spreads for family celebrations and guest-friendly service",
  },
  privateDining: {
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=560&h=320&q=80",
    title: "Private Dinners",
    subtitle: "Closer, calmer dining moments with a warmer presentation style",
  },
} as const;

type PreviewKey = keyof typeof previewData;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Syne:wght@400;700;800&display=swap');

  .hover-preview-container {
    min-height: clamp(38rem, 84vh, 52rem);
    background:
      radial-gradient(circle at 18% 18%, rgba(255, 188, 92, 0.1), transparent 32%),
      linear-gradient(135deg, #120d0a 0%, #1c140f 46%, #0f0a07 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(28px, 5vw, 56px);
    font-family: 'Space Grotesk', sans-serif;
    overflow: hidden;
    position: relative;
    isolation: isolate;
  }

  .hover-preview-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  .ambient-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
  }

  .content-container {
    position: relative;
    z-index: 1;
    max-width: 980px;
    width: 100%;
  }

  .hover-preview-kicker {
    color: #f1c27d;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.32em;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
  }

  .hover-preview-heading {
    color: #f7efe6;
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 5vw, 4.4rem);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 0.95;
    max-width: 10ch;
    margin-bottom: 1.25rem;
  }

  .hover-preview-note {
    color: #b7ada2;
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 36rem;
  }

  .text-block {
    font-size: clamp(1.35rem, 3.4vw, 2.35rem);
    line-height: 1.65;
    color: #8f857c;
    font-weight: 400;
    letter-spacing: -0.03em;
    max-width: 880px;
  }

  .text-block p {
    margin-bottom: 1.4em;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .text-block p:nth-child(1) { animation-delay: 0.2s; }
  .text-block p:nth-child(2) { animation-delay: 0.4s; }
  .text-block p:nth-child(3) { animation-delay: 0.6s; }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: #fff7eb;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff9f67, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after,
  .hover-link:focus-visible::after {
    width: 100%;
  }

  .hover-link:focus-visible {
    outline: none;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 8px;
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 159, 103, 0.12);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.9rem;
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 10px;
    font-size: 0.78rem;
    color: #988d83;
    line-height: 1.45;
  }

  @media (max-width: 768px) {
    .hover-preview-container {
      min-height: 44rem;
      align-items: flex-start;
      padding: 24px 20px 36px;
    }

    .hover-preview-heading {
      max-width: 12ch;
    }

    .text-block {
      font-size: clamp(1.15rem, 6vw, 1.7rem);
      line-height: 1.75;
    }

    .preview-card img {
      width: min(280px, calc(100vw - 56px));
    }
  }
`;

interface HoverPreviewProps {
  className?: string;
}

const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onTap,
}: {
  previewKey: PreviewKey;
  children: React.ReactNode;
  onHoverStart: (key: PreviewKey, event: React.MouseEvent<HTMLSpanElement>) => void;
  onHoverMove: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onHoverEnd: () => void;
  onTap: (key: PreviewKey, event: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  return (
    <span
      className="hover-link"
      tabIndex={0}
      onMouseEnter={(event) => onHoverStart(previewKey, event)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
      onClick={(event) => onTap(previewKey, event)}
      onFocus={(event) => onHoverStart(previewKey, event)}
      onBlur={onHoverEnd}
    >
      {children}
    </span>
  );
};

const PreviewCard = ({
  data,
  position,
  isVisible,
  cardRef,
}: {
  data: (typeof previewData)[PreviewKey] | null;
  position: { x: number; y: number };
  isVisible: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  if (!data) return null;

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  );
};

export function HoverPreview({ className }: HoverPreviewProps) {
  const [activePreviewKey, setActivePreviewKey] = useState<PreviewKey | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activePreview = useMemo(
    () => (activePreviewKey ? previewData[activePreviewKey] : null),
    [activePreviewKey]
  );

  useEffect(() => {
    Object.values(previewData).forEach((data) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = data.image;
    });
  }, []);

  const updatePosition = useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    const cardWidth = bounds?.width ?? 300;
    const cardHeight = bounds?.height ?? 250;
    const offsetY = 20;
    const isMobileViewport = window.innerWidth < 768;

    if (isMobileViewport) {
      setPosition({
        x: Math.max(16, (window.innerWidth - cardWidth) / 2),
        y: Math.max(16, window.innerHeight - cardHeight - 24),
      });
      return;
    }

    let x = event.clientX - cardWidth / 2;
    let y = event.clientY - cardHeight - offsetY;

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20;
    }

    if (x < 20) {
      x = 20;
    }

    if (y < 20) {
      y = event.clientY + offsetY;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: PreviewKey, event: React.MouseEvent<HTMLSpanElement>) => {
      setActivePreviewKey(key);
      setIsVisible(true);
      updatePosition(event);
    },
    [updatePosition]
  );

  const handleHoverMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (isVisible) {
        updatePosition(event);
      }
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleTap = useCallback(
    (key: PreviewKey, event: React.MouseEvent<HTMLSpanElement>) => {
      if (activePreviewKey === key && isVisible) {
        setIsVisible(false);
        return;
      }

      setActivePreviewKey(key);
      setIsVisible(true);
      updatePosition(event);
    },
    [activePreviewKey, isVisible, updatePosition]
  );

  return (
    <>
      <style>{styles}</style>
      <div className={cn("hover-preview-container", className)}>
        <div className="ambient-glow" />

        <div className="content-container">
          <p className="hover-preview-kicker">Interactive Service Preview</p>
          <h2 className="hover-preview-heading">See the mood before you book the menu.</h2>
          <p className="hover-preview-note">
            Hover on desktop or tap on mobile to preview how each event format feels in the room.
          </p>

          <div className="text-block">
            <p>
              Start with{" "}
              <HoverLink
                previewKey="weddings"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onTap={handleTap}
              >
                Wedding Feasts
              </HoverLink>{" "}
              for ceremony-led buffet styling and elegant service pacing that keeps the celebration
              flowing.
            </p>

            <p>
              For cleaner timelines, preview{" "}
              <HoverLink
                previewKey="corporate"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onTap={handleTap}
              >
                Corporate Lunches
              </HoverLink>{" "}
              or explore{" "}
              <HoverLink
                previewKey="birthdays"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onTap={handleTap}
              >
                Birthday Tables
              </HoverLink>{" "}
              built for lively family gatherings and guest-friendly movement.
            </p>

            <p>
              If the occasion is quieter,{" "}
              <HoverLink
                previewKey="privateDining"
                onHoverStart={handleHoverStart}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onTap={handleTap}
              >
                Private Dinners
              </HoverLink>{" "}
              bring a warmer, more intimate presentation style with closer service and calmer
              pacing.
            </p>
          </div>
        </div>

        <PreviewCard
          data={activePreview}
          position={position}
          isVisible={isVisible}
          cardRef={cardRef}
        />
      </div>
    </>
  );
}
