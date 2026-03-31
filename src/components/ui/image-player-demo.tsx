import { ImagePlayer } from "@/components/ui/image-player";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=80",
];

export default function ImagePlayerDemo() {
  return (
    <div className="flex min-h-[440px] items-center justify-center bg-[hsl(45,40%,96%)] p-6 md:p-12">
      <div className="w-full max-w-xl overflow-hidden border border-[hsl(40,20%,85%)] bg-white p-3 shadow-[0_24px_60px_rgba(34,24,12,0.12)]">
        <ImagePlayer
          images={DEMO_IMAGES}
          interval={700}
          renderImage={(src, index) => (
            <div className="relative overflow-hidden">
              <img
                src={src}
                alt={`Event showcase ${index + 1}`}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                  Showcase Frame {index + 1}
                </p>
                <p className="mt-2 text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Catering moments in motion
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
