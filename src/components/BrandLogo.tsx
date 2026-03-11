import type { CSSProperties } from "react";

type BrandLogoProps = {
  variant?: "compact" | "full";
  className?: string;
};

const primaryPalette = [
  ["#2f80ff", "#1749c7"],
  ["#8f76ff", "#684fe0"],
  ["#4dcf55", "#1f9f3b"],
  ["#ff5da9", "#e63d87"],
  ["#4fc3ff", "#2187e4"],
  ["#ffd654", "#f4a723"],
  ["#7eea67", "#38bb52"],
] as const;

const secondaryPalette = [
  ["#72d8ff", "#2ea7e6"],
  ["#66dd7a", "#34b95f"],
  ["#2f80ff", "#1749c7"],
  ["#ff5da9", "#e63d87"],
  ["#ffd654", "#f4a723"],
  ["#8f76ff", "#684fe0"],
  ["#4fc3ff", "#2187e4"],
  ["#66dd7a", "#34b95f"],
] as const;

const tilts = [-4, 3, -2, 2, -3, 3, -2, 2];

const renderWord = (word: string, palette: ReadonlyArray<readonly [string, string]>) => (
  <span className="brand-logo-row" aria-hidden="true">
    {word.split("").map((char, index) => {
      const [start, end] = palette[index % palette.length];
      const style = {
        "--brand-start": start,
        "--brand-end": end,
        "--brand-tilt": `${tilts[index % tilts.length]}deg`,
      } as CSSProperties;

      return (
        <span key={`${word}-${index}`} className="brand-letter" style={style}>
          {char}
        </span>
      );
    })}
  </span>
);

const BrandLogo = ({ variant = "full", className = "" }: BrandLogoProps) => {
  if (variant === "compact") {
    return (
      <div className={`brand-logo brand-logo-compact ${className}`.trim()} aria-label="Rebekha Caterers">
        {renderWord("REBEKHA", primaryPalette)}
        <span className="brand-logo-subtitle">CATERERS</span>
      </div>
    );
  }

  return (
    <div className={`brand-logo ${className}`.trim()} aria-label="Rebekha Caterers">
      {renderWord("REBEKHA", primaryPalette)}
      {renderWord("CATERERS", secondaryPalette)}
    </div>
  );
};

export default BrandLogo;
