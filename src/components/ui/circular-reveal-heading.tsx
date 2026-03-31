import React, { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextItem {
  text: string;
  image: string;
}

interface CircularRevealHeadingProps {
  items: TextItem[];
  centerText: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    container: "h-[280px] w-[280px] sm:h-[300px] sm:w-[300px]",
    fontSize: "text-[10px] sm:text-xs",
    tracking: "tracking-[0.25em]",
    radius: 120,
    gap: 36,
    imageSize: "h-[74%] w-[74%]",
    textStyle: "font-medium",
  },
  md: {
    container: "h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] lg:h-[400px] lg:w-[400px]",
    fontSize: "text-xs sm:text-sm",
    tracking: "tracking-[0.3em]",
    radius: 160,
    gap: 30,
    imageSize: "h-[75%] w-[75%]",
    textStyle: "font-medium",
  },
  lg: {
    container: "h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] lg:h-[500px] lg:w-[500px]",
    fontSize: "text-sm sm:text-base",
    tracking: "tracking-[0.35em]",
    radius: 160,
    gap: 20,
    imageSize: "h-[75%] w-[75%]",
    textStyle: "font-medium",
  },
} as const;

const usePreloadImages = (images: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = (url: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to preload ${url}`));
      });

    Promise.all(images.map(loadImage))
      .then(() => {
        if (isMounted) {
          setLoaded(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [images]);

  return loaded;
};

const ImagePreloader = ({ images }: { images: string[] }) => (
  <div className="hidden" aria-hidden="true">
    {images.map((source, index) => (
      <img key={`${source}-${index}`} src={source} alt="" />
    ))}
  </div>
);

const ImageOverlay = ({
  image,
  size = "md",
}: {
  image: string;
  size?: "sm" | "md" | "lg";
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
  >
    <motion.img
      src={image}
      alt=""
      className={cn(sizeConfig[size].imageSize, "rounded-full object-cover")}
      style={{ filter: "brightness(0.9)" }}
    />
  </motion.div>
);

export function CircularRevealHeading({
  items,
  centerText,
  className,
  size = "md",
}: CircularRevealHeadingProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const config = sizeConfig[size];
  const imageSources = useMemo(() => items.map((item) => item.image), [items]);
  const imagesLoaded = usePreloadImages(imageSources);
  const uniqueId = useId().replace(/:/g, "");
  const curveId = `circular-curve-${uniqueId}`;
  const gradientId = `circular-gradient-${uniqueId}`;
  const shadowId = `circular-shadow-${uniqueId}`;

  const createTextSegments = () => {
    const totalItems = items.length;
    const totalGapDegrees = config.gap * totalItems;
    const availableDegrees = 360 - totalGapDegrees;
    const segmentDegrees = availableDegrees / totalItems;

    return items.map((item, index) => {
      const startPosition = index * (segmentDegrees + config.gap);
      const startOffset = `${(startPosition / 360) * 100}%`;
      const showImage = () => {
        if (imagesLoaded) {
          setActiveImage(item.image);
        }
      };

      return (
        <g key={`${item.text}-${index}`}>
          <text
            className={cn(
              config.fontSize,
              config.tracking,
              config.textStyle,
              "cursor-pointer uppercase transition-all duration-300"
            )}
            onMouseEnter={showImage}
            onMouseLeave={() => setActiveImage(null)}
            onFocus={showImage}
            onBlur={() => setActiveImage(null)}
            onClick={() =>
              setActiveImage((current) => (current === item.image ? null : item.image))
            }
            role="button"
            tabIndex={0}
            filter={`url(#${shadowId})`}
          >
            <textPath
              href={`#${curveId}`}
              startOffset={startOffset}
              textLength={`${segmentDegrees * 1.8}`}
              lengthAdjust="spacingAndGlyphs"
              fill={`url(#${gradientId})`}
              className="transition-all duration-300 hover:fill-[#2d3436]"
            >
              {item.text}
            </textPath>
          </text>
        </g>
      );
    });
  };

  return (
    <>
      <ImagePreloader images={imageSources} />
      <motion.div
        whileHover={{
          boxShadow: "20px 20px 40px #bebebe, -20px -20px 40px #ffffff",
        }}
        whileTap={{ scale: 0.98 }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "relative overflow-hidden rounded-full bg-[#e6e6e6] shadow-[16px_16px_32px_#bebebe,-16px_-16px_32px_#ffffff] transition-all duration-500 ease-out",
          config.container,
          className
        )}
      >
        <AnimatePresence>
          {activeImage && imagesLoaded && <ImageOverlay image={activeImage} size={size} />}
        </AnimatePresence>

        <motion.div
          className="absolute inset-[2px] rounded-full bg-[#e6e6e6]"
          style={{
            boxShadow: "inset 6px 6px 12px #d1d1d1, inset -6px -6px 12px #ffffff",
          }}
        />

        <motion.div
          className="absolute inset-[12px] rounded-full bg-[#e6e6e6]"
          style={{
            boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff",
          }}
        />

        <motion.div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {!activeImage && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff",
                }}
                className="relative z-10 rounded-3xl bg-[#e6e6e6] p-6"
              >
                {centerText}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#666666" />
                <stop offset="100%" stopColor="#444444" />
              </linearGradient>
              <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.55" />
              </filter>
            </defs>
            <path
              id={curveId}
              fill="none"
              d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
            />
            {createTextSegments()}
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}
