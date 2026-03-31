import * as React from "react";

interface ImagePlayerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  images: string[];
  interval?: number;
  loop?: boolean;
  onComplete?: () => void;
  renderImage?: (src: string, index: number) => React.ReactNode;
}

export const ImagePlayer: React.FC<ImagePlayerProps> = ({
  images,
  interval = 500,
  loop = true,
  onComplete,
  renderImage,
  alt = "Image player frame",
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const hasCompletedRef = React.useRef(false);

  const currentImage = React.useMemo(() => images[currentIndex], [images, currentIndex]);

  React.useEffect(() => {
    setCurrentIndex(0);
    hasCompletedRef.current = false;
  }, [images]);

  React.useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    if (!loop && currentIndex >= images.length - 1) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete?.();
      }

      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= images.length) {
          return loop ? 0 : prevIndex;
        }

        return nextIndex;
      });
    }, interval);

    return () => window.clearTimeout(timeoutId);
  }, [currentIndex, images.length, interval, loop, onComplete]);

  if (!images || images.length === 0) {
    return <div className="text-destructive">No images !!</div>;
  }

  return (
    <>
      {renderImage ? (
        renderImage(currentImage, currentIndex)
      ) : (
        <img src={currentImage} alt={alt} {...props} />
      )}
    </>
  );
};
