"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  className,
  contentClassName,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);

  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const touchStartYRef = useRef(0);

  const resetState = () => {
    scrollProgressRef.current = 0;
    mediaFullyExpandedRef.current = false;
    touchStartYRef.current = 0;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  };

  const updateProgress = (nextProgress: number) => {
    const clampedProgress = clamp(nextProgress, 0, 1);
    const isExpanded = clampedProgress >= 1;

    scrollProgressRef.current = clampedProgress;
    mediaFullyExpandedRef.current = isExpanded;

    setScrollProgress(clampedProgress);
    setMediaFullyExpanded(isExpanded);
    setShowContent(clampedProgress >= 0.75);
  };

  useEffect(() => {
    resetState();
  }, [mediaType]);

  useEffect(() => {
    const handleReset = () => {
      resetState();
      window.scrollTo(0, 0);
    };

    window.addEventListener("resetSection", handleReset as EventListener);

    return () => {
      window.removeEventListener("resetSection", handleReset as EventListener);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (mediaFullyExpandedRef.current && event.deltaY < 0 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        setMediaFullyExpanded(false);
        event.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        event.preventDefault();
        const nextProgress = scrollProgressRef.current + event.deltaY * 0.0009;
        updateProgress(nextProgress);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartYRef.current) return;

      const touchY = event.touches[0]?.clientY ?? 0;
      const deltaY = touchStartYRef.current - touchY;

      if (mediaFullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        setMediaFullyExpanded(false);
        event.preventDefault();
      } else if (!mediaFullyExpandedRef.current) {
        event.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const nextProgress = scrollProgressRef.current + deltaY * scrollFactor;
        updateProgress(nextProgress);
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = 0;
    };

    const handleScroll = () => {
      if (!mediaFullyExpandedRef.current && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const mediaWidth = 320 + scrollProgress * (isMobileState ? 560 : 1120);
  const mediaHeight = 420 + scrollProgress * (isMobileState ? 180 : 360);
  const textTranslateX = scrollProgress * (isMobileState ? 120 : 90);

  const [firstWord, restOfTitle] = useMemo(() => {
    if (!title) return ["", ""];
    const titleParts = title.split(" ");
    return [titleParts[0] ?? "", titleParts.slice(1).join(" ")];
  }, [title]);

  const showYoutubeEmbed = mediaType === "video" && mediaSrc.includes("youtube.com");

  return (
    <div className={cn("overflow-x-hidden transition-colors duration-700 ease-in-out", className)}>
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=""
              className="h-screen w-screen object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,6,0.28),rgba(14,10,6,0.62))]" />
          </motion.div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "94vw",
                  maxHeight: "82vh",
                  boxShadow: "0 0 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {showYoutubeEmbed ? (
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <iframe
                      width="100%"
                      height="100%"
                      src={
                        mediaSrc.includes("embed")
                          ? `${mediaSrc}${mediaSrc.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1`
                          : `${mediaSrc.replace("watch?v=", "embed/")}?autoplay=1&mute=1&loop=1&controls=0&rel=0&disablekb=1&modestbranding=1&playlist=${mediaSrc.split("v=")[1] ?? ""}`
                      }
                      className="h-full w-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <motion.div
                      className="absolute inset-0 rounded-[1.5rem] bg-black/30"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : mediaType === "video" ? (
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-full w-full rounded-[1.5rem] object-cover"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="absolute inset-0 rounded-[1.5rem] bg-black/30"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <img
                      src={mediaSrc}
                      alt={title || "Media content"}
                      className="h-full w-full rounded-[1.5rem] object-cover"
                      loading="eager"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-[1.5rem] bg-black/45"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center text-[hsl(43,76%,80%)] transition-none">
                  {date && (
                    <p
                      className="text-lg sm:text-xl md:text-2xl"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-sm font-medium uppercase tracking-[0.32em] text-[hsl(42,65%,75%)]"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "relative z-10 flex w-full flex-col items-center justify-center gap-3 text-center transition-none",
                  textBlend ? "mix-blend-screen" : "mix-blend-normal",
                )}
              >
                <motion.h1
                  className="text-4xl font-semibold uppercase tracking-[0.22em] text-[hsl(43,76%,82%)] sm:text-5xl lg:text-6xl"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h2
                  className="text-4xl font-semibold uppercase tracking-[0.18em] text-[hsl(43,76%,82%)] sm:text-5xl lg:text-6xl"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className={cn("flex w-full flex-col px-0 pb-12 pt-10 md:pb-16 lg:pb-24", contentClassName)}
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export { ScrollExpandMedia };

export default ScrollExpandMedia;
