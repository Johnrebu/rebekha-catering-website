import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { ImagePlayer } from "@/components/ui/image-player";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { ThreeDIconTabs, type IconTabItem } from "@/components/ui/3d-icon-tabs-1";
import weddingCateringImage from "@/assets/wedding-catering.jpg";
import birthdayCateringImage from "@/assets/birthday-catering.jpg";
import {
  Briefcase,
  CalendarDays,
  Cake,
  ChevronLeft,
  ChevronRight,
  Heart,
  House,
  Image as ImageIcon,
  LayoutGrid,
  Quote,
  Sparkles,
  UtensilsCrossed,
  X,
} from "lucide-react";

type EventType =
  | "All"
  | "Weddings"
  | "Birthdays"
  | "Corporate"
  | "Housewarming"
  | "Private Dining";

interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  eventType: Exclude<EventType, "All">;
  eventDate: string;
  caption: string;
  feedback: string;
  location: string;
}

const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    src: weddingCateringImage,
    alt: "Elegant wedding buffet setup in a decorated banquet hall",
    eventType: "Weddings",
    eventDate: "2026-02-21",
    caption: "Grand wedding buffet with live counters for 800 guests",
    feedback:
      "The spread was elegant and service timing was perfect throughout the evening.",
    location: "Tambaram, Chennai",
  },
  {
    id: 2,
    src: birthdayCateringImage,
    alt: "Colorful birthday party catering table with snacks and decorations",
    eventType: "Birthdays",
    eventDate: "2026-01-30",
    caption: "Colorful birthday menu with dessert and chaat stations",
    feedback:
      "Kids loved the menu variety and the setup looked amazing in photos.",
    location: "Chromepet, Chennai",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Corporate lunch buffet in conference venue",
    eventType: "Corporate",
    eventDate: "2026-02-08",
    caption: "Corporate annual day lunch for 450 attendees",
    feedback:
      "Professional team and smooth crowd handling during peak lunch time.",
    location: "OMR, Chennai",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "South Indian lunch service",
    eventType: "Housewarming",
    eventDate: "2026-01-14",
    caption: "Traditional South Indian lunch service for housewarming event",
    feedback:
      "Authentic taste and very hygienic service. Guests were very happy.",
    location: "Pallikaranai, Chennai",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Private dinner table arrangement with premium plating",
    eventType: "Private Dining",
    eventDate: "2025-12-27",
    caption: "Premium plated dinner experience for a family celebration",
    feedback: "Menu customization was done exactly to our preferences.",
    location: "Adyar, Chennai",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Biryani station in wedding reception",
    eventType: "Weddings",
    eventDate: "2026-02-03",
    caption: "Live biryani counter as part of wedding dinner menu",
    feedback:
      "Flavor and aroma were outstanding. The biryani counter was the highlight.",
    location: "Porur, Chennai",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Breakfast spread for corporate training event",
    eventType: "Corporate",
    eventDate: "2025-12-19",
    caption: "Breakfast and tea break menu for corporate training day",
    feedback:
      "Punctual service and good variety for all dietary preferences.",
    location: "Guindy, Chennai",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Dosa and tiffin station",
    eventType: "Housewarming",
    eventDate: "2026-02-16",
    caption: "Live tiffin and dosa station for morning function",
    feedback:
      "Freshly made items and great support from the serving team.",
    location: "Velachery, Chennai",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Non-veg starters platter",
    eventType: "Birthdays",
    eventDate: "2026-01-22",
    caption: "Special non-veg starters counter for evening birthday event",
    feedback: "The starters were served hot and tasted excellent.",
    location: "Medavakkam, Chennai",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Formal plated dinner service",
    eventType: "Private Dining",
    eventDate: "2026-02-12",
    caption: "Curated plated dinner for anniversary celebration",
    feedback:
      "Beautiful plating and highly attentive staff from start to finish.",
    location: "Anna Nagar, Chennai",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Dessert counter with sweets and ice cream",
    eventType: "Weddings",
    eventDate: "2026-01-18",
    caption: "Wedding dessert bar with traditional and modern sweets",
    feedback: "Dessert quality and presentation were top class.",
    location: "Mylapore, Chennai",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Paneer starters in buffet line",
    eventType: "Corporate",
    eventDate: "2026-02-26",
    caption: "Vegetarian starter bar for product launch event",
    feedback:
      "Great veg choices and smooth buffet flow even during rush hour.",
    location: "Nungambakkam, Chennai",
  },
];

const galleryTabs: IconTabItem<EventType>[] = [
  {
    id: "All",
    label: "All",
    icon: <LayoutGrid className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "Weddings",
    label: "Weddings",
    icon: <Heart className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "Birthdays",
    label: "Birthdays",
    icon: <Cake className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "Corporate",
    label: "Corporate",
    icon: <Briefcase className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "Housewarming",
    label: "Housewarming",
    icon: <House className="h-7 w-7 md:h-8 md:w-8" />,
  },
  {
    id: "Private Dining",
    label: "Dining",
    icon: <UtensilsCrossed className="h-7 w-7 md:h-8 md:w-8" />,
    badge: "NEW",
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<EventType>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resetSection"));
  }, []);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "All") {
      return galleryPhotos;
    }

    return galleryPhotos.filter((photo) => photo.eventType === activeFilter);
  }, [activeFilter]);

  const featuredReelPhotos = useMemo(() => filteredPhotos, [filteredPhotos]);

  const openPhoto = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length,
    );
  const showNext = () =>
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredPhotos.length,
    );

  const selectedPhoto = selectedIndex !== null ? filteredPhotos[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-[hsl(45,40%,94%)]">
      <SEO
        title="Event Photo Gallery - Weddings, Birthdays, Corporate | Rebekha Catering"
        description="Browse Rebekha Catering event gallery with real photos, event filters, dates, captions, and client feedback from weddings, birthdays, corporate, and private functions in Chennai."
        keywords="catering gallery Chennai, wedding catering photos, birthday event catering photos, corporate catering gallery, catering lightbox gallery"
        canonical="https://rebekhacaterers.online/gallery"
        ogUrl="https://rebekhacaterers.online/gallery"
      />
      <StructuredData />
      <Navigation />

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1920&q=80"
        title="Event Gallery"
        date="Chennai Celebrations"
        scrollToExpand="Scroll to reveal the archive"
        textBlend
        contentClassName="pt-12 md:pt-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <section className="rounded-[2rem] border border-[hsl(40,20%,85%)] bg-white/95 p-6 shadow-[0_24px_60px_rgba(34,24,12,0.10)] backdrop-blur md:p-10">
            <div className="flex flex-col gap-8">
              <div>
                <h2
                  className="mb-2 text-4xl text-[hsl(30,20%,15%)]"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  Our Creations
                </h2>
                <p className="flex items-center gap-2 text-sm text-[hsl(30,10%,45%)]">
                  <ImageIcon className="h-4 w-4" />
                  Showing {filteredPhotos.length} photo
                  {filteredPhotos.length !== 1 ? "s" : ""}{" "}
                  {activeFilter !== "All"
                    ? `in ${activeFilter}`
                    : "across all events"}
                </p>
              </div>

              <ThreeDIconTabs
                tabs={galleryTabs}
                activeTab={activeFilter}
                onTabChange={(tabId) => {
                  setActiveFilter(tabId as EventType);
                  setSelectedIndex(null);
                }}
              />
            </div>
          </section>

          <section className="grid gap-8 rounded-[2rem] border border-[hsl(40,20%,85%)] bg-white p-6 shadow-[0_24px_60px_rgba(34,24,12,0.08)] md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="flex flex-col gap-6">
              <div>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[hsl(43,76%,58%)]">
                  <Sparkles className="h-4 w-4" />
                  Gallery Reel
                </p>
                <h3
                  className="mt-4 text-4xl text-[hsl(30,20%,15%)] md:text-5xl"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  A quick preview of
                  {" "}
                  {activeFilter === "All" ? "every celebration." : `${activeFilter.toLowerCase()} moments.`}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-[hsl(30,10%,35%)]">
                  This auto-playing strip uses the current gallery filter, so visitors can scan event
                  atmosphere before opening the full lightbox experience.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,96%)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(30,10%,45%)]">
                    Active filter
                  </p>
                  <p className="mt-2 text-lg text-[hsl(30,20%,15%)]">{activeFilter}</p>
                </div>
                <div className="border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,96%)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(30,10%,45%)]">
                    Reel frames
                  </p>
                  <p className="mt-2 text-lg text-[hsl(30,20%,15%)]">{featuredReelPhotos.length}</p>
                </div>
                <div className="border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,96%)] p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[hsl(30,10%,45%)]">
                    Auto-play speed
                  </p>
                  <p className="mt-2 text-lg text-[hsl(30,20%,15%)]">1.4s</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-[hsl(40,20%,85%)] bg-[hsl(30,20%,12%)] p-3 shadow-[0_24px_60px_rgba(34,24,12,0.16)]">
              <ImagePlayer
                images={featuredReelPhotos.map((photo) => photo.src)}
                interval={1400}
                renderImage={(src, index) => {
                  const reelPhoto = featuredReelPhotos[index];

                  return (
                    <div className="relative overflow-hidden">
                      <img
                        src={src}
                        alt={reelPhoto?.alt ?? "Event gallery highlight"}
                        className="aspect-[5/4] w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 text-white">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/75">
                          {reelPhoto?.eventType ?? activeFilter} | {index + 1} / {featuredReelPhotos.length}
                        </p>
                        <h4
                          className="mt-2 text-2xl leading-tight text-white"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {reelPhoto?.caption ?? "Event highlight"}
                        </h4>
                        <p className="mt-2 text-sm text-white/80">
                          {reelPhoto?.location ?? "Chennai"}
                        </p>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[hsl(40,20%,85%)] bg-[hsl(45,40%,96%)] p-6 shadow-[0_24px_60px_rgba(34,24,12,0.08)] md:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhotos.map((photo, index) => (
                <motion.article
                  key={photo.id}
                  className="group cursor-pointer overflow-hidden border border-[hsl(40,20%,85%)] bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => openPhoto(index)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                      {photo.eventType}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className="mb-2 text-lg text-[hsl(30,20%,15%)]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {photo.caption}
                    </h3>
                    <p className="mb-3 flex items-center gap-2 text-xs text-[hsl(30,10%,45%)]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(photo.eventDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      | {photo.location}
                    </p>
                    <p className="flex items-start gap-2 text-sm leading-relaxed text-[hsl(30,10%,35%)]">
                      <Quote className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(43,76%,58%)]" />
                      {photo.feedback}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </ScrollExpandMedia>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 text-white transition-colors hover:text-[hsl(43,76%,58%)]"
            onClick={closeLightbox}
            aria-label="Close gallery modal"
          >
            <X className="h-8 w-8" />
          </button>

          {filteredPhotos.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-[hsl(43,76%,58%)] md:left-6"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-9 w-9" />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white transition-colors hover:text-[hsl(43,76%,58%)] md:right-6"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
              >
                <ChevronRight className="h-9 w-9" />
              </button>
            </>
          )}

          <div
            className="w-full max-w-5xl border border-white/20 bg-[hsl(30,20%,12%)] text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-h-[68vh] w-full object-contain bg-black"
            />
            <div className="p-5">
              <p className="mb-2 text-xs uppercase tracking-wider text-[hsl(43,76%,58%)]">
                {selectedPhoto.eventType} |{" "}
                {selectedIndex !== null ? selectedIndex + 1 : 1} / {filteredPhotos.length}
              </p>
              <h3
                className="mb-2 text-xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {selectedPhoto.caption}
              </h3>
              <p className="mb-3 text-sm text-white/80">
                {new Date(selectedPhoto.eventDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                | {selectedPhoto.location}
              </p>
              <p className="text-sm text-white/90">{selectedPhoto.feedback}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
